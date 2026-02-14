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
} from "lucide-react";
import { getSecretToken, removeSecretKey } from "../utils/SessionStorageUtil";
export default function SideBarNav() {
  useEffect(()=>{
    if(!getSecretToken()){
      window.navigation.navigate("/login")
    }

  },[getSecretToken()])
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
        window.navigation.navigate("/login")
    }
  return (
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


      <div className={`${style.section} ${location=="globalcontent"&&style.sectionActive}`}>
        <span>
          <Film className={`${style.icon} ${location=="globalcontent"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="globalcontent"&&style.routeActive}`}>Global Content</span>
      </div>


      <div className={`${style.section} ${location=="watchlogs"&&style.sectionActive}`}>
        <span>
          <Clock className={`${style.icon} ${location=="watchlogs"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="watchlogs"&&style.routeActive}`}>Watch Logs</span>
      </div>


      <div className={`${style.section} ${location=="moderation"&&style.sectionActive}`}>
        <span>
          <ShieldAlert className={`${style.icon} ${location=="moderation"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="moderation"&&style.routeActive}`}>Safety & Moderation</span>
      </div>


      <div className={`${style.section} ${location=="analytics"&&style.sectionActive}`}>
        <span>
          <BarChart3 className={`${style.icon} ${location=="analytics"&&style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${location=="analytics"&&style.routeActive}`}>Platform Analytics</span>
      </div>
      <div className={style.bottomSection}>
        <div className={style.section} onClick={()=>{
            handleLogout();
        }}>
          <span>
            <LogOut className={style.icon} />
          </span>
          <span className={style.routeName}>Logout</span>
        </div>
           <div className={style.section}>
          <span className={style.profileContainer}>
            <img src="https://www.jokescoff.com/wp-content/uploads/profile-whatsapp-dp-1-748x421.jpg" className={style.profileImage} alt="ProfileImge" />
          </span>
          <div><p className={`${style.routeName} ${style.darkText}`}>Super User</p>
          <p className={style.routeName}>example@gmail.com</p></div>
        </div>
      </div>
    </div>
  );
}
