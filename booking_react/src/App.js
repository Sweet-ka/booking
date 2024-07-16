import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/home/Home';
import { Chat } from './components/rooms/chat/Chat';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";

import style from "./App.module.css";
import { Login } from './components/login/Login';
import { Flat } from './components/flats/flat/Flat';
import { Flats } from './components/flats/Flats';
import { useState, useEffect } from 'react';

function App() {
  const [rates, setRates] = useState([])
  const [selectedCur, setSelectedCur] = useState()

  const getCurrencies = async () => {
    const response = await fetch('https://api.nbrb.by/exrates/currencies');
    const data = await response.json();
    return data;
  }

  const getRates = async () => {
    const response = await fetch('https://api.nbrb.by/exrates/rates?periodicity=0');
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    const dataCur = async () => {
      const resCurrencies = await getCurrencies();
      const resRates = await getRates();

      resRates.map(item => {
        const name = resCurrencies.filter(elem => elem.Cur_ID === item.Cur_ID)[0]?.Cur_Name;
        item.Cur_Name = name;
        return item;
      })

      const byn = {
        Cur_ID: 0,
        Cur_Code: "",
        Cur_Abbreviation: "BYN",
        Cur_Name: "Белорусский рубль",
        Cur_OfficialRate: 1,
        Cur_Scale: 1
      }


      resRates.push(byn)

      resRates.sort((a, b) => a.Cur_Name.localeCompare(b.Cur_Name))
      setRates(resRates)
      setSelectedCur(JSON.parse(sessionStorage.getItem("cur")) || byn)
    }
    dataCur();
  }, [setRates])

  const setCur = (cur) => {
    setSelectedCur(cur)
  }

  return (
    <div className={style.App}>
    <Router>
        <Routes>
          <Route path="/" element={<Home rates={rates} selectedCur={selectedCur} setCur={setCur}/>} ></Route>
          <Route path="/login" element={<Login rates={rates} selectedCur={selectedCur} setCur={setCur}/>}></Route>
          <Route path="/chat" element={<Chat rates={rates} selectedCur={selectedCur} setCur={setCur}/>}></Route>
          <Route path="/flats" element={<Flats rates={rates} selectedCur={selectedCur} setCur={setCur}/>}></Route>
          <Route path="/flat" element={<Flat rates={rates} selectedCur={selectedCur} setCur={setCur}/>} >
            <Route path=":flatId" element={<Flat rates={rates} selectedCur={selectedCur} setCur={setCur}/>}></Route>          
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
