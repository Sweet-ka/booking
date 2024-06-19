import { useCallback, useEffect, useState } from "react"
import { Dialod } from "../dialog/Dialog";
import { Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from "./Room.module.css";


export const Room = (props) => {
  const [rooms, setRooms] = useState([]);
  const [roomID, setRoomID] = useState(null);
  const headers = useCallback(() => {return {Authorization: `Token ${props.token}`}}, [props.token]);
  const currentUser = useCallback(() => props.currentUser, [props.currentUser]);

  const loadRoom = useCallback(async () => {
    if (!props.token) {
      setRooms([]);
      setRoomID(null)
      return;
    };
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/booking/room', {headers: headers()});
      if (response.status !== 200) {
        throw new Error();
      }
      const roomsData = await response.json();
      setRooms(roomsData);
    } catch (err) {
      alert(err.name)
    }
  }, [props.token, headers]);

  const createRoom = useCallback(async() => {
      try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/booking/room/', {
        method: 'POST',  
        headers: headers(),
      });
      if (response.status !== 201) {
        throw new Error(response);
      }
      loadRoom();
    } catch (err) {
      alert(err.name)
    }
  }, [headers, loadRoom])

  useEffect(() => {
    loadRoom();
  }, [loadRoom, props.currentUser])
  
  const goDialog = (id) => {
    if(id) setRoomID(id);
  }

  return (
    <div className={style.wrap}>
      <p>rooms</p>
        <Row>
          <Col sm={4}>
            <ul className={style.rooms}>
              <li key={'first'}>
                <Button variant="success" onClick={createRoom}>Создать чат</Button>
              </li>
              {rooms?.data?.data?.map((room, i) => {
              return <li key={i}>
                  <Button variant="light" className={style.dialog} onClick={() => goDialog(room?.id)}>
                    {room?.creater?.id === Number(currentUser().id) ? "" : <p key={'first'}>{room?.creater?.username}</p>}
                    {room?.invited.map((item, i) => {
                      return item.id !== Number(currentUser().id) ? <p key={i}>{item.username}</p> : ''
                    })}
                  </Button>
                </li>
              })}
            </ul>
          </Col>
          <Col >
            <Dialod roomID={roomID} token={props.token} currentUser={currentUser()}/>
          </Col>
        </Row>
    </div>
  )
}