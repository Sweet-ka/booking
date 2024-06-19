import { useNavigate } from "react-router-dom";
import { Room } from "../rooms/room/Room";
import { useCallback, useEffect, useState } from "react"
import { Button } from "react-bootstrap";
import style from "./Home.module.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


export const Home = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem('auth_token'));

  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  }

  const logout = () => {
    sessionStorage.removeItem('auth_token');
    setToken(sessionStorage.getItem('auth_token'));
  }

  const currentUser = useCallback(async() => {
    try {
      let response = await fetch('http://127.0.0.1:8000/auth/users/me', {headers: {Authorization: `Token ${token}`}});

      if (!response.ok) {
        throw new Error('', {cause: response.status})
      }

      let result = await response.json();
      console.log(result.data);
      setUser(result.data)
    } catch (err) {
      if (err.cause === 400) {
        console.log('Пользователь не авторизован')
      }
    }
  }, [token])

  useEffect(() => {
    setAuth(token && token !== '');
    currentUser();
  }, [token, currentUser])

  return (
    <div>
      <Container>
        <Row>
          <Col className={style.head}>
            <Stack direction="horizontal" gap={3}>
              <h2 className="p-2 me-auto" data-bs-theme="dark">Чат</h2>
              <span>{user?.attributes?.username}</span>
              <div className="p-2">
                {auth ? <Button variant="secondary" className={style.login} onClick={logout}>Выход</Button> : <Button variant="secondary" onClick={goLogin}>Вход</Button>}
              </div>
            </Stack>
          </Col>
        </Row>
        <Row>
          <Room token={token} currentUser={user}/>
        </Row>
      </Container>
    </div>
  )
}
