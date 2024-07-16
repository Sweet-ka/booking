/** @format */

import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import style from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import { Logo } from "../logo/Logo";
import { Currencies } from "../currencies/Currencies";

export const Header = (props) => {
  const { rates, selectedCur, setCur } = props

  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState(sessionStorage.getItem("auth_token"));

  const navigate = useNavigate();

  const goLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    sessionStorage.removeItem("auth_token");
    setToken(sessionStorage.getItem("auth_token"));
    setUser({});
    setAuth(false);
  };

  const currentUser = useCallback(async () => {
    try {
      let response = await fetch("http://127.0.0.1:8000/auth/users/me", {
        headers: { Authorization: `Token ${token}` },
      });

      if (!response.ok) {
        throw new Error("", { cause: response.status });
      }

      let result = await response.json();
      setUser(result.data);
    } catch (err) {
      if (err.cause === 400) {
        console.log("Пользователь не авторизован");
      }
    }
  }, [token]);

  useEffect(() => {
    setAuth(token && token !== "");
    console.log(token)
    currentUser();
  }, [token, currentUser]);

  return (
    <header className={style.header}>
      <Container>
        <Row>
          <Col>
            <div className={style.headerInner}>
              <Logo/>
              <nav className={style.nav}>
                <Stack direction='horizontal' gap={3}>
                  {/* <span>{user?.attributes?.username}</span> */}
                  <Currencies rates={rates} selectedCur={selectedCur} setCur={setCur}/>
                  <div className='p-2'>
                    {auth ? (
                      <div>
                        <Button variant="light" className={style.user}><h5>{user?.attributes?.username}</h5></Button>
                        <Button variant='warning' className={style.login} onClick={logout}>
                          <Image src='/images/logout.png' width={"30px"} />
                          Выход
                        </Button>
                      </div>
                    ) : (
                      <div>
                        <Button className={style.login} variant='warning' onClick={goLogin}>
                          <Image src='/images/login.png' width={"30px"} />
                          Вход
                        </Button>
                      </div>
                    )}
                  </div>
                </Stack>
              </nav>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};
