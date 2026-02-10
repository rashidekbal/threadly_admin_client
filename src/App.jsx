import { Route, Routes } from "react-router";
import Context from "./store/Context";

import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import Login from "./pages/Auth/Login";
function App() {
  return (
    <>
      <div style={{height:"100vh",width:"100vw"}}>
        <Context>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/Home" element={<Home />}></Route>
          </Routes>
        </Context>
      </div>
    </>
  );
}

export default App;
