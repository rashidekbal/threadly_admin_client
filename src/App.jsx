import { Route, Routes } from "react-router";
import Context from "./store/Context";
import style from "./App.module.css"

import NavBar from "./components/NavBar";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/DashBoard/DashBoard";
import UserDirectory from "./pages/UserDirectory/UserDirectory";
import Home from "./pages/Home/Home";
function App() {
  return (
    <>
      <div className={style.mainContainer} >
        <ToastContainer/>
        <Context>
          <Routes>
              <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}>
            <Route path="" element={<DashBoard />}></Route>
            <Route path="userdirectory" element={<UserDirectory/>}/>
            </Route>
          </Routes>
        </Context>
      </div>
    </>
  );
}

export default App;
