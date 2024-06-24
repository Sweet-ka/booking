import style from "./Logo.module.css";
import { Image } from "react-bootstrap";

export const Logo = (props) => {
  return (
    <div className={`${style.logo} ${style[props.color]}`}>
      <div className={style.logoImg}>
        <Image src='/images/earth.png' alt='logo' />
        <div className={style.flyWrap}>
          <Image className={style.fly} src='/images/fly.png' alt='logo' />
        </div>
      </div>
      <h2 className={style.logoName} data-bs-theme='dark'>
        Let's go!
      </h2>
  </div>
)
}