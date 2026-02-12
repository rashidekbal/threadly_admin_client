import React from 'react'
import style from "./DashBoard.module.css"
import SideBarNav from '../../components/SideBarNav'
import NavBar from '../../components/NavBar'
import DashBoardHeading from '../../components/DashBoardHeading'
import DashBoardStats from '../../components/DashBoardStats'
export default function DashBoard() {
  return (
    <div className={style.mainContainer}>
        <div className={`${style.section} ${style.sideBar}`}>
     <SideBarNav/>
        </div>
        <div className={`${style.section} ${style.mianView}`}>
            <NavBar/>
            <DashBoardHeading/>
            <DashBoardStats/>
        </div>
    </div>
  )
}
