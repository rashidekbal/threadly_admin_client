import React from 'react'
import style from "./DashBoard.module.css"
import SideBarNav from '../../components/SideBarNav'
import NavBar from '../../components/NavBar'
import DashBoardHeading from '../../components/DashBoardHeading'
import DashBoardStats from '../../components/DashBoardStats'
import GraphChart from '../../components/GraphChart'
import BarChartStats from '../../components/BarChartStats'
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
            <div className={style.sectionContainer}>
                <div className={style.container}>
                    <GraphChart/>
                </div>
                <div className={style.container}>
                    <BarChartStats/>
                </div>

            </div>
        </div>
    </div>
  )
}
