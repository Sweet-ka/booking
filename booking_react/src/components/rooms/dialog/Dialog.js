import { useState, useEffect, useCallback } from "react"
import style from "./Dialog.module.css";
import React from "react";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Button } from "react-bootstrap";
import { AddUsers } from "../addUsers/AddUsers";

export const Dialod = (props) => {
  const [dialog, setDialog] = useState([]);
  const msg = React.createRef();
  const headers = useCallback(() => {return {Authorization: `Token ${props.token}`}}, [props.token]);
  const currentUser = useCallback(() => props.currentUser, [props.currentUser]);

  const loadDialog = useCallback(async() => {
    if(!props.roomID) {
      setDialog([]);
      return;
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/v1/booking/dialog/?room=${props.roomID}`, {headers: headers()});
      if (response.status !== 200) {
        throw new Error();
      }
      const dialogData = await response.json();
      setDialog(dialogData?.data?.data)
      console.log(dialogData?.data?.data)  
    } catch (err) {
      console.log(err)
    }
  }, [headers, props.roomID])

  useEffect(() => {
    loadDialog();
}, [loadDialog])

const sendMessage = useCallback(async(e) => {
  e.preventDefault();
  const data = new FormData(msg.current)
  data.append('room', props.roomID)
    try {
    const response = await fetch('http://127.0.0.1:8000/api/v1/booking/dialog/', {
      method: 'POST',  
      headers: headers(),
      body: data
    });
    if (response.status !== 200) {
      throw new Error(response);
    }
    const dialogData = await response.json();
    console.log(dialogData?.data)  
    loadDialog();
    msg.current.reset();
  } catch (err) {
    alert(err.name)
  }
}, [headers, props.roomID, msg, loadDialog])

  return (
      <div>
        <div>
          <AddUsers token={props.token} roomID={props.roomID}/>
        </div>
        <ul className={style.dialogs}>
          {dialog.map((message, i) => {
              return (
              <li key={i} className={message?.user?.id === Number(currentUser().id) ? style.incoming : style.outgoing}>
                <div>
                  <div className={style.msgInfo}>
                    <p className={style.username}>{message?.user?.username}</p>
                    <p className={style.date}>{new Date(message?.date).toLocaleString()}</p>
                  </div>
                  <p className={style.text}>{message?.text}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <Form className={style.sendMessage} ref={msg}>
        <FloatingLabel controlId="floatingTextarea2" label="Введите текст сообщения">
          <Form.Control
            name="text"
            as="textarea"
            placeholder="Ваше сообщение"
            style={{ height: '100px' }}
          />
        </FloatingLabel>
        <Button variant="success" type="submit" onClick={(e) => sendMessage(e)}>
          Отправить сообщение
        </Button>
            </Form>
      </div>
    
  )
}