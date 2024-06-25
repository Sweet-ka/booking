import style from "./Carousel.module.css";
import "react-alice-carousel/lib/alice-carousel.css";

import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const cards = [
  {
    src: 
"https://cf2.bstatic.com/xdata/images/hotel/square600/319995712.webp?k=51d6cd5c852dcfff33ddc805e5cae2a2a2ceb10b6ec01d77d03daeab3e6e2248&o=",    alt: '1',
    title: 'Hotel Locarno',
    text: 'Спанья, Рим',
    href: '#1',
    price: 621,
  },
  {
    src: 
'https://cf2.bstatic.com/xdata/images/hotel/max1024x768/282357381.jpg?k=df4c1fe3b62374b4074e85f27ce7f7c8c3996224667592cf6191b84c76cbe07c&o=&hp=1'    ,
    alt: '1',
    title: 'Aris Amsterdam',
    text: 'Амтердам - центр города',
    href: '#2',
    price: 432,
  },
  {
    src: 
"https://cf2.bstatic.com/xdata/images/hotel/square600/524715425.webp?k=f462e30b91e9dedc11b302175a352a7d95fb0443b7c25654a089c92c5aff161c&o="    ,
    alt: '1',
    title: 'Grimm\'s Potsdamer Platz',
    text: 'Фридрихсхайн-Кройцберг, Берлин',
    href: '#3',
    price: 140,
  },

]

const card = (props) => {
  const {src, alt, title, text, href, price} = props;
  return (
    <Card className={style.card} onDragStart={handleDragStart} role='presentation'>
      <div class={style.imgWrapper}>
        <Card.Img variant='top' src={src} alt={alt} />
      </div>
      <Card.Body>
        <div className={style.priceWrapper}>
          <Card.Title as={"h3"}>{title}</Card.Title>
          <div className={style.price}>{price} $</div>
        </div>
        <Card.Text>{text}</Card.Text>
        <Link to={href} variant="primary">Go somewhere</Link>
      </Card.Body>
    </Card>
  );
}


const getItems = () => {
  return cards.reduce((acc, item) => {
    acc.push(card(item));
    return acc;
  }, [])
};

const items = getItems()


export const Carousel = () => <AliceCarousel 
  controlsStrategy={'default,alternate'}
  autoPlayInterval={2000}
  animationDuration={1000}
  mouseTracking items={items}
  autoPlay={true}
  infinite={true}
  responsive={
    {
      0: {
        items: 1,
      },
      760: {
        items: 2,
      },
      1024: {
        items: 3,
        itemsFit: 'contain',
      }
    }
}
/>;

