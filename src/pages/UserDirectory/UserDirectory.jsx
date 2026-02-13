import React from "react";
import style from "./UserDirectory.module.css";
import SideBarNav from "../../components/SideBarNav";
import NavBar from "../../components/NavBar";
import DashBoardHeading from "../../components/DashBoardHeading";
export default function UserDirectory() {
  return (
    <div className={style.mainContainer}>
      <div className={`${style.section} ${style.sideBar}`}>
        <SideBarNav />
      </div>

      <div className={`${style.section} ${style.mianView}`}>
        <NavBar/>
        <DashBoardHeading heading="User Directory" subHeading="Access all user profiles, including private accounts"/>
        <div className={style.viewContainer}>
            <div className={style.subView}></div>

        </div>
      </div>
    </div>
  );
}
