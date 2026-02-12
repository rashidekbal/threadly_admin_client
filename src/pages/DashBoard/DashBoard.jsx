import React from 'react'
import style from "./DashBoard.module.css"
import SideBarNav from '../../components/SideBarNav'
import NavBar from '../../components/NavBar'
export default function DashBoard() {
  return (
    <div className={style.mainContainer}>
        <div className={`${style.section} ${style.sideBar}`}>
     <SideBarNav/>
        </div>
        <div className={`${style.section} ${style.mianView}`}>
            <NavBar/>
        </div>
    </div>
  )
}
