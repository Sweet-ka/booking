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
    src: 'https://avatars.mds.yandex.net/i?id=27f74c587b1af1d15fd5fd26155beb6d1bf3bda0-12714255-images-thumbs&n=13',
    alt: '1',
    title: 'Slide 1',
    text: '',
    href: '#1',
    price: 120,
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=5a35be76b24368dda166789aa1a665b45b6d0dd5-12938945-images-thumbs&n=13',
    alt: '1',
    title: 'Slide 2',
    text: '',
    href: '#2',
    price: 130,
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=c8311fa47126df67bd98f043c43ea23bd9830b1e-10415038-images-thumbs&n=13',
    alt: '1',
    title: 'Slide 3',
    text: '',
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

