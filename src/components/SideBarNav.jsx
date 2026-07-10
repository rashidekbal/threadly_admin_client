import React, { useEffect, useState } from "react";
import style from "./styles/SideBarNav.module.css";
import {
  LayoutDashboard,
  Users,
  Film,
  Clock,
  ShieldAlert,
  LogOut,
  BarChart3,
  Activity,
} from "lucide-react";
import { getSecretToken, removeSecretKey } from "../utils/SessionStorageUtil";
import Dialog from "./Dialog";
import LogOutDialog from "./LogOutDialog";
import { getSecretTokenLocalStorage, removeSecretKeyLocalStorage } from "../utils/localStorageUtil";
export default function SideBarNav() {
  const [isLogOutDialogVisbile,setIsLogOutDialogVisible]=useState(false);
  
    const [location,setLocation]=useState("");
     const handleNavigation=(route)=>{

      if(route=="/"){
        if(window.location.pathname==route)return;
           window.navigation.navigate("/");
      return;
      }
     let currentPath=window.location.pathname.split("/")[1];
      if(currentPath==route.toLowerCase())return ;
        window.navigation.navigate("/"+route.toLowerCase());
     };
      useEffect(()=>{
        let location=window.location.pathname;
        if(location=="/"){
          setLocation("/");
          return;
        }
       setLocation(window.location.pathname.split("/")[1]);
      },[window.location.pathname])
    const handleLogout=()=>{
        removeSecretKey();
        removeSecretKeyLocalStorage();
       return window.navigation.navigate("/login")
    }
     useEffect(()=>{
      if(!getSecretToken()&&!getSecretTokenLocalStorage()){
       return window.navigation.navigate("/login");
      }
  
    },[getSecretToken()])
  return (
    <>
    <Dialog open={isLogOutDialogVisbile}>
      <LogOutDialog toggle={setIsLogOutDialogVisible} logoutHandler={handleLogout}/>
    </Dialog>
      <div className={style.mainContainer} >
      <div className={style.topBar} onClick={()=>{
        handleNavigation("/");
      }}>
        <span>
          <ShieldAlert className={style.ShieldAlert} />
        </span>
        <span className={style.heading}>SuperAdmin</span>
      </div>
      <div className={`${style.section} ${location=="/"&&style.sectionActive}`} onClick={()=>{
        handleNavigation("/");
      }} >
        <span>
          <LayoutDashboard className={`${style.icon} ${location=="/"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="/"&&style.routeActive}`}>
          Dashboard
        </span>
      </div>

      <div className={`${style.section} ${location=="userdirectory"&&style.sectionActive}`} onClick={()=>{
        handleNavigation("userdirectory");
      }}>
        <span>
          <Users className={`${style.icon} ${location=="userdirectory"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="userdirectory"&&style.routeActive}`}>User Directory</span>
      </div>


      <div className={`${style.section} ${location=="globalcontent"&&style.sectionActive}`} onClick={()=>{
         handleNavigation("globalcontent");
      }}>
        <span>
          <Film className={`${style.icon} ${location=="globalcontent"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="globalcontent"&&style.routeActive}`}>Global Content</span>
      </div>


      <div className={`${style.section} ${location=="watchlogs"&&style.sectionActive}`} onClick={()=>{
        handleNavigation("watchlogs")
      }}>
        <span>
          <Clock className={`${style.icon} ${location=="watchlogs"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="watchlogs"&&style.routeActive}`}>Watch Logs</span>
      </div>


      <div className={`${style.section} ${location=="moderation"&&style.sectionActive}`} onClick={()=>{
        handleNavigation("safety")
      }}>
        <span>
          <ShieldAlert className={`${style.icon} ${location=="moderation"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="moderation"&&style.routeActive}`}>Safety & Moderation</span>
      </div>


      <div className={`${style.section} ${location=="analytics"&&style.sectionActive}`} onClick={()=>{
        handleNavigation("analytics")
      }}>
        <span>
          <BarChart3 className={`${style.icon} ${location=="analytics"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="analytics"&&style.routeActive}`}>Platform Analytics</span>
      </div>

      <div className={`${style.section} ${location=="anomalies"&&style.sectionActive}`} onClick={()=>{
        handleNavigation("anomalies")
      }}>
        <span>
          <Activity className={`${style.icon} ${location=="anomalies"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="anomalies"&&style.routeActive}`}>Anomaly Logs</span>
      </div>

      <div className={style.bottomSection}>
        <div className={style.section} onClick={()=>{
            setIsLogOutDialogVisible(true);
        }}>
          <span>
            <LogOut className={style.icon} />
          </span>
          <span className={style.routeName}>Logout</span>
        </div>
           <div className={style.section}>
          <span className={style.profileContainer}>
            <img src="https://res.cloudinary.com/dphwlcyhg/image/upload/v1760875291/sgx7vg4aeofopwbtmqea.webp" className={style.profileImage} alt="ProfileImge" />
          </span>
          <div><p className={`${style.routeName} ${style.darkText}`}>Super User</p>
          <p className={style.routeName}>rtechdevlopement123@gmail.com</p></div>
        </div>
      </div>
    </div>
    </>
  
  );
}
