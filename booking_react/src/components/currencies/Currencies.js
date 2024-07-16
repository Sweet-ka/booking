import style from "./Currencies.module.css";
import { DropdownButton, Dropdown } from "react-bootstrap";

export const Currencies = (props) => {
  const { rates, setCur, selectedCur } = props;

  const selectCur = (item) => {
    setCur(item);
    sessionStorage.setItem('cur', JSON.stringify(item))
  }

  return (
    <DropdownButton id="dropdown-basic-button" title={selectedCur?.Cur_Abbreviation ? selectedCur?.Cur_Abbreviation : 'Валюта'}>
      <div className={style.drop}>
        {rates ? rates.map((item, i) => {
          return <Dropdown.Item key={i} onClick={() => selectCur(item)}>
            <div className={style.cur}>
              <div>{item.Cur_Abbreviation}</div>
              <div>{item.Cur_Name}</div>
            </div>
            </Dropdown.Item>
        }) : ''}
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
      </div>
    </DropdownButton>
  )
}