import { Route, Routes } from "react-router";
import Context from "./store/Context";
import style from "./App.module.css";

import NavBar from "./components/NavBar";
import Login from "./pages/Auth/Login";
import { ToastContainer } from "react-toastify";
import DashBoard from "./pages/DashBoard/DashBoard";
import UserDirectory from "./pages/UserDirectory/UserDirectory";
import Home from "./pages/Home/Home";
import UserDirectoryMainPage from "./pages/UserDirectory/UserDirectoryMainPage";
import UserInfoPage from "./pages/UserDirectory/UserInfoPage";
import { useEffect } from "react";
import { getSecretToken } from "./utils/SessionStorageUtil";
import PageNotFound from "./pages/404/PageNotFound";
function App() {
  return (
    <>
      <div className={style.mainContainer}>
        <ToastContainer />
        <Context>
          {/* main route */}
          <Routes>
            {/* not found route */}
            <Route path="*" element={<PageNotFound />} />

            {/* login routed */}
            <Route path="/login" element={<Login />} />

            {/* main route after logged in  */}
            <Route path="/" element={<Home />}>
              {/* dashboard route */}
              <Route path="" element={<DashBoard />}></Route>

              {/* user directory route */}
              <Route path="userdirectory" element={<UserDirectory />}>
                <Route path="" element={<UserDirectoryMainPage />} />
                <Route path=":userid" element={<UserInfoPage />} />
              </Route>

              {/* not found nested route */}
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Context>
      </div>
    </>
  );
}

export default App;
