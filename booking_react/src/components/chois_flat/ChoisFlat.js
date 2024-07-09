import { useState, useCallback, useReducer } from "react"
import style from "./ChoisFlat.module.css";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { Button, Badge, Row, Col } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownRegion } from "../dropdown_region/DropdownRegion";
import { dateToString, time } from "../../shared";
import { useNavigate } from "react-router-dom";


export const ChoisFlat = (props) => {
  const navigate = useNavigate()

  const [state, setState] = useState([
    {
      startDate: sessionStorage.getItem("start") ? new Date(sessionStorage.getItem("start")) : new Date(),
      endDate: new Date(sessionStorage.getItem("end")) || null,
      key: 'selection'
    }
  ]);


  const init = (state) => {
    return state
  }


  const reducer = (state, action) => {
    switch (action.type) {
      case 'flats':
        return {
          ...state,
          flats: action.payload
        };
      case 'occupied':
        return {
          ...state,
          occupied: action.payload,
          freeFlats: action.free,
          redirect: action.redirect
        };
      case 'region':
        return {
          ...state,
          region: action.payload,
      };
      case 'showTooltipRegion':
        return {
          ...state,
          showTooltipRegion: action.show
      };
      default:
        console.log(state)
        return state;
    }
  }

  const [data, dispatch] = useReducer(reducer, {
    flats: [], 
    occupied: new Set(), 
    freeFlats: [], 
    region: sessionStorage.getItem('region') ? JSON.parse(sessionStorage.getItem('region')).id : '', 
    showTooltipRegion: false, 
    redirect: false
  }, init)

  const updateRegion = async(region) => {
    dispatch({type: 'region', payload: region})
    await getFlats(region);
  }

  const getFlats = useCallback(async(region) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/booking/flats/?region=${region}`);
      if (!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      dispatch({type: 'flats', payload: data?.data?.flats})        
    } catch (error) {
      console.log(error)
    }
  }, [])
  

  const getRange = useCallback(async() => {
    try {
      const {startDate, endDate} = state[0]
      const start = dateToString(startDate)
      const end = dateToString(endDate)
      sessionStorage.setItem('start', start)
      sessionStorage.setItem('end', end)
  
      const response = await fetch(`http://127.0.0.1:8000/api/v1/booking/range?start_date=${start}&end_date=${end}`);

      if(!response.ok) {
        throw new Error()
      }

      const resData = await response.json();
  
      const flats = new Set();
      resData?.data?.flats.forEach(item => {
        flats.add(item.flat);
      })
      const free = data.flats.filter(item => item ? !flats.has(item.id) : false)
      dispatch({
        type: 'occupied',
        payload: flats,
        free: free,
        redirect: navigate("/flats", {state: {freeFlats: free, region: data.region, start: startDate, end: endDate}})
      })
        
    } catch (error) {
      console.log(error)
    }
  },[data.flats, state, data.region, navigate])

  const handleClick = async() => {
    if(!data.region) {
      // поменять класс спска регионов
      dispatch({type: 'showTooltipRegion', show: true})
      // alert('Задайте направление')
      return false;
    } else {
      await getFlats(data.region);
      await getRange();
    }
  }

  const updateSelection = (item) => {
    let start = time(item?.selection?.startDate)
    let end = time(item?.selection?.endDate)
    if(start.getTime() === end.getTime()) end.setDate(end.getDate() + 1);
    setState([{startDate: start, endDate: end, key: 'selection'}])
  }


  return (
    <div className={props.className}>
        <Row className={style.nav}>
          <Col className={style.col}>
            <DropdownRegion update={updateRegion} show={data.showTooltipRegion} close={() => dispatch({type: 'showTooltipRegion', show: false})}/>
          </Col>
          <Col className={style.col}>
            <Dropdown autoClose='outside'>
              <Dropdown.Toggle variant='outline-light' className={style.drop} id='dropdown-basic'>
                <div className={style.dateWrapper}>
                  <div className={style.date}>
                    <Badge bg='none'>
                      {state[0]?.startDate?.toLocaleDateString()}
                    </Badge>
                  </div>
                  <div className={style.date}>
                    <Badge bg='none'>
                      {state[0]?.endDate < state[0]?.startDate ? '' : state[0]?.endDate?.toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  className={style.dropdownItem}
                  as={"div"}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                    <DateRange
                      editableDateInputs={true}
                      // onChange={(item) => setState([item.selection])}
                      onChange={(item) => updateSelection(item)}
                      moveRangeOnFirstSelection={false}
                      ranges={state}
                      showDateDisplay={false}
                      minDate={new Date()}
                      disabledDay={(date) => {
                        return data?.disabledDates?.includes(date?.getTime());
                      }}
                    />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col className={style.col}>
            <Button variant='warning' className={style.select} onClick={() => handleClick()}>
              Подобрать {data.redirect}
            </Button>
          </Col>
        </Row>
      {/* <div>
        <ul>
          {console.log('free', data.freeFlats)}
          {data.freeFlats.map((item, i) => {
            return <li key={i}>{
                <FlatCard flat={item}/>
              }</li>;
          })}
        </ul>
      </div> */}
      {data.redirect}
    </div>
  );
}