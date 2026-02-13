import React from 'react'
import style from "./styles/DashBoardHeading.module.css"
export default function DashBoardHeading({heading,subHeading,children}) {
  return (
    <div className={style.mainContainer}>
        <div className={style.section}>
            <p className={style.heading}>{heading}</p>
            <p className={style.subheading}>{subHeading}</p>
        </div>
        <div >
            {children}
        </div>
    </div>
  )
}
