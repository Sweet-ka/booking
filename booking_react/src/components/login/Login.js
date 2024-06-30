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

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault()

    if (form.current.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      if(action === "reg") {
        registration(event)
      } else {
        auth(event)
      }
    }
    setValidated(true);
  };


  const registration = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);

    try {
      let response = await fetch("http://127.0.0.1:8000/auth/users/", {
        method: "POST",
        body: data,
      });
      let result = await response.json();

      if (result?.data?.type === "User") {
        await auth(e)
      }
      
      if (response?.status !== 201) {
        throw new Error("", { cause: result?.errors[0]?.code });
      }

    } catch (err) {
      switch(err?.cause) {
        case "unique": alert("Имя пользователя занято");
        return;
        case "cannot_create_user": alert("E-mail уже зарегистрирован");
        return;
        case "password_too_short": alert("Пароль должен быть не менее 8 символов");
        break;
        default: console.log(err);
      }
    }
  };


  const auth = async (e) => {
    e.preventDefault();
    const data = new FormData(form.current);
    data.delete('email')

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

              <Form ref={form} noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
                <Form.Group className={`mb-3 ${style.formGroup}`} controlId='formBasicLogin'>
                  <Form.Control name='username' type='text' placeholder='Имя пользователя' aria-describedby="inputGroupPrepend" required/>
                  <Form.Control.Feedback className={style.tooltip} type="invalid" tooltip={true} >Заполните поле!</Form.Control.Feedback>
                </Form.Group>

                <div className={`${style.email} ${action === "auth" ? style.leave : action === "reg" ? style.comeDelay : ''}`}>
                  <Form.Group className={`mb-3 ${style.formGroup}`} controlId='formBasicEmail'>
                    {action !== "reg" ? <Form.Control name="email" type='email' placeholder='Электронная почта' disabled/>
                    : <Form.Control name="email" type='email'  placeholder='Электронная почта' required/>}
                  <Form.Control.Feedback className={style.tooltip} type="invalid" tooltip={true} >Заполните поле!</Form.Control.Feedback>
                  </Form.Group>
                </div>

                <Form.Group className={`mb-3 ${style.formGroup}`} controlId='formBasicPassword'>
                  <Form.Control name='password' type='password' placeholder='Пароль' required min="8"/>
                  <Form.Control.Feedback className={style.tooltip} type="invalid" tooltip={true} >Пароль должен быть длиной не менее 8 символов</Form.Control.Feedback>
                </Form.Group>
                <Button variant='warning' type="submit">Отправить данные</Button>
              </Form>
              
              <Navbar className={`bg-body-tertiary ${style.navbar}`}>
                <Container>
                  {action !== "reg" ? (
                    <Navbar.Text>
                      Нет аккаунта?
                      <Button variant="link" onClick={() => {setAction("reg"); setValidated(false)}}>
                        Зарегистрироваться
                      </Button>
                    </Navbar.Text>
                  ) : (
                    <Navbar.Text>
                      Уже зарегистрированы?
                      <Button variant="link" onClick={() => {setAction("auth"); setValidated(false)}}>
                        Войти
                      </Button>
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
