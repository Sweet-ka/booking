import style from "./Price.module.css";
import { declOfNum } from "../../../../shared";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export const Price = (props) => {
  const { nights, price, currency, selectedCur, rates } = props
  const [convertPrice, setConvertPrice] = useState(price)
  // const [currentCur, setCurrentCur] = useState(JSON.parse(sessionStorage.getItem('cur')))

  const convert = useCallback((cur1, cur2) => {
    return Math.round(price * cur1?.Cur_OfficialRate / cur2?.Cur_OfficialRate)
  }, [price])

  useEffect(()=> {
    // const currentCur = JSON.parse(sessionStorage.getItem('cur'))
    const firstCurData = rates.filter(item => item?.Cur_Abbreviation === currency)[0]
    const convertPrice = convert(firstCurData, selectedCur)
    setConvertPrice(convertPrice)
  }, [currency, price, rates, convert, selectedCur])

  return (
    <div className={style.row}>
      <div className={style.col}>
      </div>
      <div className={style.col}>
        <h3 className={style.price}>{selectedCur ? convertPrice * nights * selectedCur.Cur_Scale : ''} {selectedCur?.Cur_Abbreviation}</h3>
      </div>
    </div>
  )
}