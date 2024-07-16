import { ChoisFlat } from '../chois_flat/ChoisFlat'
import { Header } from '../header/Header'
import style from './Home.module.css'
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import { Carousel } from './carousel/Carousel';
import { AccordionHome } from './accordion/Accordion';
import { Gallery } from './gallery/Gallery';
import { Footer } from '../footer/Footer';

export const Home = (props) => {
  const {rates, selectedCur, setCur} = props

  return (
    <div>
      <Header rates={rates} selectedCur={selectedCur} setCur={setCur}/>
      <div id="booking" className={style.firstPart}>
        <div className={style.info}>
          <h2 className={style.sloganMain}>Воспоминания на всю жизнь находятся всего<br/><dd>в нескольких секундах от вас!</dd></h2>
          <h4 className={style.sloganSecond}>Начните путешествие с нами, и ваша мечта осуществится.</h4>
        </div>
        <Container><ChoisFlat/></Container>
      </div>
      <div className={style.secondPart}>
        <Container>
          <Row className={style.runRow}>
            <Col xl={10} lg={8} md={8} sm={8}>
              <div className={style.run}>
                <Image src="/images/car.png.webp" className={style.runImg}/>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <section className={style.service} id='favourites'>
        <Container>
          <div className={style.sectionTitle}>
            <span>Выберите из популярных</span>
            <h2 className={style.sloganMain}>Популярные направления</h2>
          </div>
          <Carousel/>
        </Container>
      </section>
      <section className={style.faq} id='faq'>
        <Container>
          <div className={style.sectionTitle}>
            <span>FAQ</span>
            <h2 className={style.sloganMain}>Часто задаваемые вопросы</h2>
          </div>
            <div className={style.sectionBody}>
              <Row className={style.questions}>
                <Col>
                  <AccordionHome/>
                </Col>
                <Col>
                  <Image src='/images/about2.png.webp' alt='questions'/>
                </Col>
              </Row>
          </div>
          <Button className={style.booking} as='div' variant="warning"><a href="#booking">Забронируйте пункт назначения</a></Button>
        </Container>
      </section>
      <Gallery/>
      <Footer page="home"/>
    </div>
  )
}
