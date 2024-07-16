import { useLocation } from "react-router-dom"
import { Footer } from "../footer/Footer"
import { Header } from "../header/Header"
import { Row, Col, Container } from "react-bootstrap"
import { ChoisFlat } from "../chois_flat/ChoisFlat"
import { FlatCard } from "../flats/flat_card/FlatCard"
import style from "./Flats.module.css";

export const Flats = (props) => {
  const {rates, selectedCur, setCur} = props
  console.log(selectedCur)
  const location = useLocation()
  return (
    <div>
      <Header rates={rates} selectedCur={selectedCur} setCur={setCur}/>
      <Container>
        <Row className={style.flats}>
          <Col xs={3}>
            <ChoisFlat className={style.chois}/>
          </Col>
          <Col >
          <ul>
            {location?.state?.freeFlats.map((item, i) => {
              return <li key={i}>{
                  <FlatCard flat={item} start={location?.state?.start} end={location?.state?.end} rates={rates} selectedCur={selectedCur} setCur={setCur}/>
                }</li>;
            })}
          </ul>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </div>
  )
}