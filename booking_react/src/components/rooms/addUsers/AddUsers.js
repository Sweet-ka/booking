import React from "react";
import { useState, useEffect, useCallback } from "react"
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

export const AddUsers = (props) => {
  const headers = useCallback(() => {return {Authorization: `Token ${props.token}`}}, [props.token]);
  const [users, setUsers] = useState([])
  const [user, setUser] = useState(null)
  const select = React.createRef()

  const loadUsers = useCallback(async() => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/booking/users', {headers: headers()});
      if (response.status !== 200) {
        throw new Error();
      }
      const users = await response.json();
      setUsers(users.data)
      console.log(users?.data)  
    } catch (err) {
      console.log(err)
    }
  }, [headers])

  const addUser = useCallback(async() => {
    if (!user) return;
    const data = {room: props.roomID, user: Number(user.id)}
    const formData = new FormData()
    formData.append('room', props.roomID)
    formData.append('user', user.id)
    console.log(data, JSON.stringify(data))
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/booking/users/', {
        method: 'POST',  
        headers: headers(),
        body: formData
      });
      console.log(response.status)
      if (response.status !== 201) {
        throw new Error();
      }
      const users1 = await response.json();
      console.log(users1?.data)  
    } catch (err) {
      console.log(err)
    }
  }, [headers, props.roomID, user])

  useEffect(() => {
    loadUsers();
}, [loadUsers])

  return (
    <div style={{display: "flex"}}>
      <Form.Select aria-label="Default select example" ref={select} onChange={() => setUser(JSON.parse(select.current.value))}>
        <option>Выберите пользователя</option>
        {users.map((item, i) => {
            return <option value={JSON.stringify(item)} key={i}>{item.attributes.username}</option>
        })}
      </Form.Select>
      <Button variant='success' onClick={addUser}>Добавить пользователя</Button>
      </div>
  )
}