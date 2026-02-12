import React from 'react'
import style from "./styles/DashBoardHeading.module.css"
export default function DashBoardHeading() {
  return (
    <div className={style.mainContainer}>
        <div className={style.section}>
            <p className={style.heading}>Platform Overview</p>
            <p className={style.subheading}>Real-time metrics across all users and Content</p>
        </div>
        <div >
            <button className={style.btn}>Export Report</button>
            <button className={style.btn}>System Scan</button>
        </div>
    </div>
  )
}
