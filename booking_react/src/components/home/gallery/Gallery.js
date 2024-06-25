import style from "./Gallery.module.css";
import "react-alice-carousel/lib/alice-carousel.css";

import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Card } from "react-bootstrap";

const handleDragStart = (e) => e.preventDefault();

const cards = [
  {
    src: 
'https://avatars.mds.yandex.net/i?id=e25a6658f28147726f785df90d144da8ebb58dd0-11008180-images-thumbs&n=13'
    ,
    alt: '1',
  },
  {
    src: 
'https://avatars.mds.yandex.net/i?id=aa2bd5b8d95d3d9221c38032c93a7ae2deb8fa67-5292718-images-thumbs&n=13'
    ,
    alt: '1',
  },
  {
    src: 
'https://avatars.mds.yandex.net/i?id=7046bfdae274e66a9f7dc043272b3109247b237d-12508201-images-thumbs&n=13'    ,
    alt: '1',
  },
  {
    src: 
'https://avatars.mds.yandex.net/i?id=6c21c36ef4d9878a7bfe063e304da1ae84a9b573-11003380-images-thumbs&n=13'
,
    alt: '1',
  },
  {
    src: 
'https://avatars.mds.yandex.net/i?id=6293e0638891836acd4a7adde97d430c8f963255-12469033-images-thumbs&n=13'
    ,
    alt: '1',
  },
  {
    src: 
'https://avatars.mds.yandex.net/i?id=6aa8bb02567232fb7727ba1e2527a0fc3f5a2672-12719024-images-thumbs&n=13'    ,
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

