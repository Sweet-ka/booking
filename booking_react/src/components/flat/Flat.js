import Card from 'react-bootstrap/Card';
import { Button, Badge, Container } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation } from 'react-router-dom';
import { useState, useCallback, useReducer, useEffect } from "react"
import { Header } from '../header/Header';
import style from "./Flat.module.css";
import { DateRange } from 'react-date-range';
import { time } from '../../shared';
import { Booking } from './booking/Booking';

export const Flat = (props) => {
  const [modalShow, setModalShow] = useState(false);
  let {state: locationState} = useLocation()


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
      case 'disabledDate':
        return {
          ...state,
          disabledDates: action.disabled
        };
      case 'free':
        return {
          ...state,
          free: action.free
        };
      case 'range':
        return {
          ...state,
          range: action.range
      };
      default:
        console.log(state)
        return state;
    }
  }


  const [data, dispatch] = useReducer(reducer, {free: true, disabledDates: [], range: []}, init)


  const getOccupiedDates = useCallback(async() => {
    const response = await fetch(`http://127.0.0.1:8000/api/v1/booking/date?flat=${locationState.flat.id}`);
    const res = await response.json();
    const dates = res.data.dates.map(obj => time(obj.date));
    dispatch({type: 'disabledDate', disabled: dates})
  }, [locationState])


  const checkRange = () => {
    const startDate = state[0]?.startDate?.toISOString().slice(0, 10);
    const endDate = state[0]?.endDate?.toISOString().slice(0, 10);
    const range = []

    let free = true;
    let count = 1;
    let date = time(startDate);

    while ((date + 1) <= time(endDate)) {
      const d = new Date(startDate)
      d.setDate(d.getDate() + count)
      range.push(d.toISOString().slice(0, 10))
      if(data.disabledDates.includes(date)) free = false;
      count += 1;
      date += 1;
    }
    dispatch({type: "free", free: free});
    dispatch({type: "range", range: range});
    return free;
  }

  const handleClick = () => {
    checkRange()
    setModalShow(true)
  }

  useEffect(() => {
    getOccupiedDates()
  }, [getOccupiedDates])

  return (
      <div>
        <Header/>

        <Container>
          <div style={{display: "flex", gap: "20px"}}>
            <Dropdown autoClose='outside'>
              <Dropdown.Toggle variant='outline-success' id='dropdown-basic'>
                <div className={style.dateWrapper}>
                  <div className={style.date}>
                    <Badge bg='light' text='dark'>
                      {state[0]?.startDate?.toLocaleDateString()}
                    </Badge>
                  </div>
                  <div className={style.date}>
                    <Badge bg='light' text='dark'>
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
                      return data?.disabledDates?.includes(time(date));
                    }}
                  />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant='outline-success' onClick={() => handleClick()}>
              Проверить наличие свободных мест
            </Button>
            <Booking
              show={modalShow}
              onHide={() => setModalShow(false)}
              free={data.free.toString()}
              range={data.range}
              flat={locationState.flat}/>
          </div>
        </Container>

        <Container>
          <Card>
              <Card.Body>
              <Card.Text as={"div"}>
                <h2>{locationState.flat.name}</h2>
                <h3>{locationState.flat.title}</h3>
                <p>{locationState.flat.desc}</p>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src={locationState.flat.path} />
          </Card>
        </Container>
      </div>
  );
}
