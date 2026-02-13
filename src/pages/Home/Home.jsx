import React from 'react'
import style from "./Home.module.css"
import SideBarNav from '../../components/SideBarNav'
import NavBar from '../../components/NavBar'
import { Outlet } from 'react-router'
export default function Home() {
  return (
    <div className={style.mainContainer}>
          <div className={`${style.section} ${style.sideBar}`}>
            <SideBarNav />
          </div>
          <div className={`${style.section} ${style.mianView} `}>
            <NavBar />
            <Outlet/>
          </div>
        </div>
  )
}
