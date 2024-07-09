import {Card, Row, Col, ListGroup, ListGroupItem} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import style from "./FlatCard.module.css";
import { Score } from '../flat/score/Score';
import { declOfNum } from '../../../shared';
import { useEffect, useState } from 'react';
import { Price } from '../flat/price/Price';

export const FlatCard = (props) => {
  const {id, path, name, link, address, title} = props.flat;
  const {start, end} = props;

  const period = (start, end) => {
    return (new Date(end) - new Date(start))/1000/60/60/24
  }

  const nights = period(start, end);

  return (
    <div>
      <Row className={style.card}>
        <Col md={3} className={style.col}>
          <div className={style.cardWrapper}><Card.Img className={style.image} variant="top" src={path}/></div>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title as={"h2"} className={style.title}>{name}</Card.Title>
            <Card.Subtitle className={style.subtitle}>
              <Link to={link} target='blank'>{address}</Link>
            </Card.Subtitle>
            <Card.Text>
              <div className={style.text}>{title}</div>
            </Card.Text>
          </Card.Body>
        </Col>
        <Col md={3}>
          <ListGroup variant="">
            <ListGroup.Item>
              <Score flat={props.flat}/>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className={style.periodText}>
                {nights} {declOfNum(nights, ['ночь', 'ночи', 'ночей'])}
              </div>
            </ListGroup.Item>
            <ListGroupItem>
              <Price nights={nights}/>
            </ListGroupItem>
            <ListGroup.Item>
              <Link className={style.linkFlat} to={`/flat/id=${id}`} state={{flat: props.flat}}>Наличие мест</Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
     </Row>
    </div>
  );
}
