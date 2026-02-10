import style from "./styles/NavBar.module.css"
import { useEffect, useState } from "react"
 const NavigationPaths=["Home","Users"];
export default function NavBar() {
 const [location,setLocation]=useState("");
 const handleNavigation=(route)=>{
    window.navigation.navigate("/"+route.toLowerCase());
 };
  useEffect(()=>{
   setLocation(window.location.pathname.split("/")[1]);
  
  },[window.location.pathname]);

  return (
    <div className={location=="/login"?style.hidden:style.mainContainer}>
      <div className={style.logoContainer}>
        <p className={`${style.logoTextDark} ${style.logoText}`}>Threadly <span>Admin Panel</span></p>
      </div>
      <div className={style.navigation_btn_container}>
        {
          NavigationPaths.map((item)=>{
            return(<button  className={style.btndark} key={item} onClick={()=>{
              handleNavigation(item)
            }}>
              {item}
            </button>)
          })
        }

      </div>
    </div>
  )
}
