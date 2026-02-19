import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "./UserInfoPage.module.css";
import {
  ArrowLeft,
  Edit3,
} from "lucide-react";
import UserInfoTile from "../../components/UserInfoTile";
import Dialog from "../../components/Dialog";
import UserInfoEditor from "../../components/UserInfoEditor";
export default function UserInfoPage() {
  
  const { userid } = useParams();
  const [isProfileEditorOpen,setIsProfileEditorOpen]=useState(false);
   const userData = {
    uuid:"sdvbdfjvbdfjvbjks",
    userid:userid,
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSDmaQhe5BqKWGs0YvLsRNZIO0YwQls4xOg&s",
      status: "active",
      privacy:"PUBLIC",
      username: userid.split("@")[1],
      bio: "Super admin view: Accessing all data for alex_designer. Profile is currently PUBLIC to the public",
      email:`${userid.split("@")[1]}@gmail.com`,
      joined: new Date().toDateString(),
      posts: 142,
      followers: 12400,
      following: 850,
      reports: 0,
      violations: 0,
    };

    const handleProfileEditorOpen=()=>{
    setIsProfileEditorOpen(true);
  }
  return (

    <>
    {/* profile editor dialog */}
    <Dialog open={isProfileEditorOpen}>
      <UserInfoEditor data={userData} toggle={setIsProfileEditorOpen}/>
    </Dialog>
     <div className={style.mainContainer}>
      <div className={style.viewContainer}>
        {/* tool bar  */}
        <div className={style.toolBar}>
          <div className={style.section}>
            <div className={style.backBtn}>
              <span>
                <ArrowLeft className={style.icon} />
              </span>
              <span>Back to Directory</span>
            </div>
          </div>
          <div className={style.section}>
            <div className={style.btn} onClick={()=>{
              handleProfileEditorOpen()
            }}>
              <span>
                <Edit3 className={style.icon} />
              </span>
              <span className={style.btnText}>Edit Profile</span>
            </div>
            <div className={style.btn}>
              <span className={style.btnText}>Restrict Account</span>
            </div>
          </div>
        </div>
       <UserInfoTile data={userData}/>
      </div>
    </div></>
   
  );
}
