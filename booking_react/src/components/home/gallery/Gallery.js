import style from "./Gallery.module.css";
import "react-alice-carousel/lib/alice-carousel.css";

import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Card } from "react-bootstrap";

const handleDragStart = (e) => e.preventDefault();

const cards = [
  {
    src: 'https://avatars.mds.yandex.net/i?id=27f74c587b1af1d15fd5fd26155beb6d1bf3bda0-12714255-images-thumbs&n=13',
    alt: '1',
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=5a35be76b24368dda166789aa1a665b45b6d0dd5-12938945-images-thumbs&n=13',
    alt: '1',
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=c8311fa47126df67bd98f043c43ea23bd9830b1e-10415038-images-thumbs&n=13',
    alt: '1',
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=27f74c587b1af1d15fd5fd26155beb6d1bf3bda0-12714255-images-thumbs&n=13',
    alt: '1',
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=5a35be76b24368dda166789aa1a665b45b6d0dd5-12938945-images-thumbs&n=13',
    alt: '1',
  },
  {
    src: 'https://avatars.mds.yandex.net/i?id=c8311fa47126df67bd98f043c43ea23bd9830b1e-10415038-images-thumbs&n=13',
    alt: '1',
  },
]

const card = (props) => {
  const {src, alt} = props;
  return (
    <Card className={style.card} onDragStart={handleDragStart} role='presentation'>
      <div class={style.imgWrapper}>
        <Card.Img variant='top' src={src} alt={alt} />
      </div>
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


export const Gallery = () => <AliceCarousel 
  controlsStrategy={'default,alternate'}
  autoPlayInterval={0}
  animationDuration={3000}
  autoPlayControls={false}
  mouseTracking items={items}
  autoPlay={true}
  infinite={true}
  animationEasingFunction={"linear"}
  disableButtonsControls={true}
  disableDotsControls={true}
  responsive={
    {
      0: {
        items: 2,
      },
      760: {
        items: 4,
      },
      1024: {
        items: 6,
        itemsFit: 'contain',
      }
    }
}
/>;

