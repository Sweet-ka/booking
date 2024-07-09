import style from "./Price.module.css";
import { declOfNum } from "../../../../shared";
import { Link } from "react-router-dom";

export const Price = (props) => {
  const { nights } = props

  return (
    <div className={style.row}>
      <div className={style.col}>
      </div>
      <div className={style.col}>
        <h3 className={style.price}>{150 * nights} $</h3>
      </div>
    </div>
  )
}