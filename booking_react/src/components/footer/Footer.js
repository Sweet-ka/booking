import { Logo } from "../logo/Logo"
import { Container } from "react-bootstrap";
import style from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <Container>
        <Logo color={"white"}/>
      </Container>
    </footer>
  )
}