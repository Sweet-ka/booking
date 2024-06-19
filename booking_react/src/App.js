import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './components/home/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
} from "react-router-dom";
import style from "./App.module.css";
import { Login } from './components/login/Login';

function App() {
  return (
    <div className={style.App}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
