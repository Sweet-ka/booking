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
import { Flat } from './components/flat/Flat';

function App() {
  return (
    <div className={style.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/flat" element={<Flat />} >
            <Route path=":flatId" element={<Flat />}></Route>          
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
