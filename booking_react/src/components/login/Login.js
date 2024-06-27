/** @format */

import React, { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Image, Navbar } from "react-bootstrap";
import { Logo } from "../logo/Logo";
import { Footer } from "../footer/Footer";

export function Login(props) {
  const form = React.createRef();
  const navigate = useNavigate();
  const [action, setAction] = useState('');


  const auth = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);

    try {
      let response = await fetch("http://127.0.0.1:8000/auth/token/login", {
        method: "POST",
        body: data,
      });

      if (response.status !== 200) {
        throw new Error("", { cause: response.status });
      }

      let result = await response.json();
      console.log(result.data.attributes.auth_token);
      const token = result.data.attributes.auth_token;
      sessionStorage.setItem("auth_token", token);
      navigate(-1);
    } catch (err) {
      if (err.cause === 400) {
        alert("Неправильный логин или пароль");
      }
    }
  };

  const registration = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);

    try {
      let response = await fetch("http://127.0.0.1:8000/auth/token/login", {
        method: "POST",
        body: data,
      });

      if (response.status !== 200) {
        throw new Error("", { cause: response.status });
      }

      let result = await response.json();
      console.log(result.data.attributes.auth_token);
      const token = result.data.attributes.auth_token;
      sessionStorage.setItem("auth_token", token);
      navigate(-1);
    } catch (err) {
      if (err.cause === 400) {
        alert("Неправильный логин или пароль");
      }
    }
  };

  return (
    <div className={style.registr}>
      <Container>
        <Logo />
        <Row className={style.tableWrapper}>
          <Col>
            <Image src='/images/about.png.webp' />
          </Col>
          <Col className={style.formSection}>
            <div className={style.formWrapper}>
              <div className={style.titleWrapper}>
                <h2 className={`${style.authTitle} ${action === "auth" ? style.comeDelay : action === "reg" ? style.leave : style.come}`}>Авторизация</h2>
                <h2 className={`${style.regTitle} ${action === "auth" ? style.leave : action === "reg" ? style.comeDelay : ''}`}>Регистрация</h2>
              </div>
              <Form ref={form}>
                <Form.Group className='mb-3' controlId='formBasicLogin'>
                  <Form.Control name='username' type='text' placeholder='Имя пользователя' />
                </Form.Group>

                <div className={`${style.email} ${action === "auth" ? style.leave : action === "reg" ? style.comeDelay : ''}`}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Control name="email" type='email' placeholder='Электронная почта' />
                  </Form.Group>
                </div>

                <Form.Group className='mb-3' controlId='formBasicPassword'>
                  <Form.Control name='password' type='password' placeholder='Пароль' />
                </Form.Group>
                <Button variant='warning' onClick={action.auth !== "reg" ? auth : registration} type='submit'>
                  Отправить данные
                </Button>
              </Form>
              <Navbar className={`bg-body-tertiary ${style.navbar}`}>
                <Container>
                  {action !== "reg" ? (
                    <Navbar.Text>
                      Нет аккаунта?
                      <a href='#x' onClick={() => setAction("reg")}>
                        Зарегистрироваться
                      </a>
                    </Navbar.Text>
                  ) : (
                    <Navbar.Text>
                      Уже зарегистрированы?
                      <a href='#x' onClick={() => setAction("auth")}>
                        Войти
                      </a>
                    </Navbar.Text>
                  )}
                </Container>
              </Navbar>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
