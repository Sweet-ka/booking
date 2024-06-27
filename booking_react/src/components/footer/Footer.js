import { Logo } from "../logo/Logo"
import { Container, Row, Col, Navbar, Image } from "react-bootstrap";
import style from "./Footer.module.css";

export const Footer = (props) => {
  return (
    <footer className={style.footer}>
      <Container className={style.container}>
        <Row className={style.rowMain}>
          <Col>
            <Logo color={"white"}/>        
          </Col>
          <Col>
          { props.page === "home" ?
            <Navbar className={style.nav} data-bs-theme="dark">
              <Navbar.Brand href="#booking">
                <Image src={"/images/geo.png"} alt="geo" height={"30px"}/>
                Бронирование
              </Navbar.Brand>
              <Navbar.Brand href="#favourites">
                <Image src={"/images/star.png"} alt="geo" height={"30px"}/>
                Популярное</Navbar.Brand>
              <Navbar.Brand href="#faq">
                <Image src={"/images/question.png"} alt="geo" height={"30px"}/>
                FAQ</Navbar.Brand>
            </Navbar>
            : ''
          }
          </Col>
          <Col>
            3 of 3
          </Col>
        </Row>
        <Row>
          <Col>
            <span className={style.copyright}>Copyright ©2024 Design by Colorlib</span>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}