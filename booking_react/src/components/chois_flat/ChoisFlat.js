import { useState, useCallback, useReducer } from "react"
import style from "./ChoisFlat.module.css";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { Button, Badge, Container } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownRegion } from "../dropdown_region/DropdownRegion";
import { FlatCard } from "../flat/flat_card/FlatCard";
import { dateToString } from "../../shared";


export const ChoisFlat = () => {

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);


  const init = (state) => {
    console.log(state)
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
          freeFlats: action.free
        };
      case 'region':
        return {
          ...state,
          region: action.payload
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

  const [data, dispatch] = useReducer(reducer, {flats: [], occupied: new Set(), freeFlats: [], region: '', showTooltipRegion: false}, init)

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
      console.log("Квартиры в регионе:", data.data.flats)
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
      console.log(state[0], start, end, new Date(startDate))
  
      const response = await fetch(`http://127.0.0.1:8000/api/v1/booking/range?start_date=${start}&end_date=${end}`);

      if(!response.ok) {
        throw new Error()
      }

      const resData = await response.json();
      console.log(start, end, "занятые даты:", resData.data)
  
      const flats = new Set();
      resData?.data?.flats.forEach(item => {
        flats.add(item.flat);
      })
      const free = data.flats.filter(item => item ? !flats.has(item.id) : false)
      dispatch({type: 'occupied', payload: flats, free: free})
        
    } catch (error) {
      console.log(error)
    }
  },[data.flats, state])

  const handleClick = async() => {
    if(!data.region) {
      // поменять класс спска регионов
      dispatch({type: 'showTooltipRegion', show: true})
      // alert('Задайте направление')
    } else {
      await getFlats(data.region);
      await getRange()
    }
  }


  return (
    <Container>
      <div>
        <div className={style.nav}>
          <div>
            <DropdownRegion update={updateRegion} show={data.showTooltipRegion} close={() => dispatch({type: 'showTooltipRegion', show: false})}/>
          </div>
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
                    {state[0]?.endDate?.toLocaleDateString()}
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
                    onChange={(item) => setState([item.selection])}
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
          <Button variant='warning' className={style.select} onClick={() => handleClick()}>
            Подобрать
          </Button>
        </div>
      </div>
      <div>
        <ul>
          {data.freeFlats.map((item, i) => {
            return <li key={i}>{
                <FlatCard flat={item}/>
              }</li>;
          })}
        </ul>
      </div>
    </Container>
  );
}