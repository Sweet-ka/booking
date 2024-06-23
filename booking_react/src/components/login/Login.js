import React from "react"
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export function Login(props) {

  const form = React.createRef()
  const navigate = useNavigate();

  const send = async(e) => {
    e.preventDefault();
    const data = new FormData(form.current)

    try {
      let response = await fetch('http://127.0.0.1:8000/auth/token/login', {
        method: 'POST',
        body: data
      });

      if (response.status !== 200) {
        throw new Error('', {cause: response.status})
      }

      let result = await response.json();
      console.log(result.data.attributes.auth_token);
      const token = result.data.attributes.auth_token;
      sessionStorage.setItem('auth_token', token)
      alert('Спасибо что вы с нами!')
      // navigate("/", {state: {token: token}});
      navigate(-1)

    } catch (err) {
      if (err.cause === 400) {
        alert('Неправильный логин или пароль')
      }
    }
  }


  return (
    <form className={style.formLogin} ref={form}>
      <input name="username" type="text" placeholder="login" required/>
      <input name="password" type="password" placeholder="password" required/>
      <button type="submit" onClick={send}>Sign up</button>
    </form>
  )
}
