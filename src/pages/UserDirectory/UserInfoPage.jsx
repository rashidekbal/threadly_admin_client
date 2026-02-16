import React from "react";
import { useParams } from "react-router";
import style from "./UserInfoPage.module.css";
import {
  ArrowLeft,
  Edit3,
} from "lucide-react";
import UserInfoTile from "../../components/UserInfoTile";
export default function UserInfoPage() {
  const { userid } = useParams();
  return (
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
            <div className={style.btn}>
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
       <UserInfoTile/>
      </div>
    </div>
  );
}
