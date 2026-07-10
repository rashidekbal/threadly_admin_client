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
import GlobalContentMain from "./pages/Global_content/GlobalContentMain";
import WatchLogsMain from "./pages/WatchLogs/WatchLogsMain";
import SafetyAndModerationMain from "./pages/SafetyModeration/SafetyAndModerationMain";
import AnalyticsMain from "./pages/Analytics/AnalyticsMain";
import AnomalyLogsMain from "./pages/AnomalyLogs/AnomalyLogsMain";
import { io } from "socket.io-client";
import { baseServerUrl } from "./routes/Routes";
import { toast } from "react-toastify";
import DeletedRecordsMainPage from './pages/DeletedRecords/DeletedRecordsMainPage';

function App() {
  useEffect(() => {
    const socket = io(baseServerUrl);
    socket.emit("admin_auth");
    
    socket.on("anomaly_alert", (data) => {
      window.dispatchEvent(new CustomEvent("anomaly_received"));
      toast.error(`⚠️ SERVER ANOMALY: ${data.error_message} (${data.api_path})`, {
        position: "top-right",
        autoClose: false,
        theme: "dark"
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);
 
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
               {/* globalContent route */}
              <Route path="globalcontent" element={<GlobalContentMain/>}>
              </Route>
              {/* watch logs route */}
              <Route path="watchlogs" element={<WatchLogsMain/>}>
              </Route>
              {/* safety and moderation route */}
              <Route path="safety" element={<SafetyAndModerationMain/>}>
              </Route>
              {/* analytics route */}
              <Route path="analytics" element={<AnalyticsMain/>}>
              </Route>
              {/* anomaly logs route */}
              <Route path="anomalies" element={<AnomalyLogsMain/>}>
              </Route>
              {/* deleted records route */}
              <Route path="deleted-records" element={<DeletedRecordsMainPage/>}>
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
