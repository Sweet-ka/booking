import Card from 'react-bootstrap/Card';
import { Button, Badge, Container } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { useLocation } from 'react-router-dom';
import { useState, useReducer, useEffect } from "react"
import { Header } from '../../header/Header';
import style from "./Flat.module.css";
import { DateRange } from 'react-date-range';
import { time } from '../../../shared';
import { Booking } from '../booking/Booking';
import { dateToString } from '../../../shared';

export const Flat = (props) => {
  const {rates, selectedCur, setCur} = props
  const [modalShow, setModalShow] = useState(false);
  let {state: locationState} = useLocation()
  const [ws, setWs] = useState(null);


  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:8000/ws/booking/date/flat/${locationState.flat.id}/`)
  
    socket.onopen = function(e) {
      socket.send(JSON.stringify({
        "flat": locationState.flat.id
      }));
    };

    socket.onmessage = function(event) {
      try {
        const data = JSON.parse(event.data);
        const dates = data.dates.map(obj => obj.date);
        dispatch({type: 'disabledDate', disabled: dates})
      } catch (e) {
        console.log('Error:', e.message);
      }
    }

    socket.onclose = () => {
      console.log('WebSocket is closed');
    };

    setWs(socket);

    // return () => {
    //     socket.close();
    // };

  }, [locationState.flat])

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


  // const getOccupiedDates = useCallback(() => {

    // const response = await fetch(`http://127.0.0.1:8000/api/v1/booking/date?flat=${locationState.flat.id}`);
    // const res = await response.json();
    // const dates = res.data.dates.map(obj => obj.date);
    // dispatch({type: 'disabledDate', disabled: dates})
  // }, [locationState.flat.id])


  const checkRange = () => {
    const {startDate, endDate} = state[0]
    sessionStorage.setItem("start", startDate);
    sessionStorage.setItem("end", endDate);
    const range = []
    let free = true;
    let date = +time(startDate);
    let max = +time(endDate)
    const d = new Date(startDate)

    while (date <= max) {
      range.push(dateToString(d))
      if (data.disabledDates.includes(dateToString(d))) free = false
      d.setDate(d.getDate() + 1)
      date += 2 * 12 * 60 * 60 * 1000
    }
    dispatch({type: "free", free: free});
    dispatch({type: "range", range: range});
    return free;
  }

  const handleClick = () => {
    checkRange()
    setModalShow(true)
  }

  return (
      <div>
      <Header rates={rates} selectedCur={selectedCur} setCur={setCur}/>

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
                      return data?.disabledDates?.includes(dateToString(date));
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
              flat={locationState.flat}
              ws={ws}/>
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
