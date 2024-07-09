import style from "./Score.module.css";
import { declOfNum } from "../../../../shared";
import { Link } from "react-router-dom";

export const Score = (props) => {
  const getNumberReviews = Math.round(Math.random()*30 + 70)
  const getNumberScore = Math.round((Math.random() + 8.5)*10)/10

  const getTextScore = (score) => {
    console.log(score)
    let text = "так себе.."
    if(score > 7) text = "Хорошо!";
    if(score > 8) text = "Очень хорошо!";
    if(score > 9) text = "Потрясающе!";
    return text;
  }

  const textScore = getTextScore(getNumberScore)

  return (
    <div className={style.row}>
      <div className={style.col}>
        <div className={style.scoreText}>{textScore}</div>
        <Link to={'/'} className={style.reviews}>{getNumberReviews} {declOfNum(getNumberReviews, ['отзыв', 'отзыва', 'отзывов'])}</Link>
      </div>
      <div className={style.col}>
        <div className={style.number}>{getNumberScore}</div>
      </div>
    </div>
  )
}