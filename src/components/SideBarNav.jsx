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
import { removeSecretKey } from "../utils/SessionStorageUtil";
export default function SideBarNav() {
    const [location,setLocation]=useState("");
    
     const handleNavigation=(route)=>{
        window.navigation.navigate("/"+route.toLowerCase());
     };
      useEffect(()=>{
       setLocation(window.location.pathname.split("/")[1]);
      
      },[window.location.pathname])
    const handleLogout=()=>{
        removeSecretKey();
        window.navigation.navigate("/login")
    }
  return (
    <div className={style.mainContainer}>
      <div className={style.topBar}>
        <span>
          <ShieldAlert className={style.ShieldAlert} />
        </span>
        <span className={style.heading}>SuperAdmin</span>
      </div>
      <div className={`${style.section} ${style.sectionActive}`}>
        <span>
          <LayoutDashboard className={`${style.icon} ${style.iconActive}`} />
        </span>
        <span className={`${style.routeName} ${style.routeActive}`}>
          Dashboard
        </span>
      </div>
      <div className={style.section}>
        <span>
          <Users className={style.icon} />
        </span>
        <span className={style.routeName}>User Directory</span>
      </div>
      <div className={style.section}>
        <span>
          <Film className={style.icon} />
        </span>
        <span className={style.routeName}>Global Content</span>
      </div>
      <div className={style.section}>
        <span>
          <Clock className={style.icon} />
        </span>
        <span className={style.routeName}>Watch Logs</span>
      </div>
      <div className={style.section}>
        <span>
          <ShieldAlert className={style.icon} />
        </span>
        <span className={style.routeName}>Safety & Moderation</span>
      </div>
      <div className={style.section}>
        <span>
          <BarChart3 className={style.icon} />
        </span>
        <span className={style.routeName}>Platform Analytics</span>
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
