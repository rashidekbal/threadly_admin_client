import { Route, Routes } from "react-router";
import Context from "./store/Context";
import style from "./App.module.css"
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <div className={style.mainContainer} >
        <ToastContainer/>
        <Context>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/home" element={<Home />}></Route>
          </Routes>
        </Context>
      </div>
    </>
  );
}

export default App;
