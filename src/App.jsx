import { Route, Routes } from "react-router";
import Context from "./store/Context";
import style from "./App.module.css"

import NavBar from "./components/NavBar";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/DashBoard/DashBoard";
function App() {
  return (
    <>
      <div className={style.mainContainer} >
        <ToastContainer/>
        <Context>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashBoard" element={<DashBoard />}></Route>
          </Routes>
        </Context>
      </div>
    </>
  );
}

export default App;
