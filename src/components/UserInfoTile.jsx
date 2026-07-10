import React, { useState } from "react";
import style from "./styles/UserInfoTile.module.css";
import { useParams } from "react-router";
import {
  ArrowLeft,
  ShieldCheck,
  ExternalLink,
  MessageCircle,
  Heart,
  Eye,
  Play,
  Calendar,
  Clock,
  Edit3,
} from "lucide-react";
import UserPosts from "../pages/UserDirectory/UserPosts";
import UserStories from "../pages/UserDirectory/UserStories";
import UserHistory from "../pages/UserDirectory/UserHistory";
import UserFollowers from "../pages/UserDirectory/UserFollowers";
import UserFollowings from "../pages/UserDirectory/UserFollowings";
import NoData from "./NoData";

export default function UserInfoTile({data}) {
  const handleTabChange=(tab)=>{
    setSelectedTab(tab);

  }
  const { userid } = useParams();
  const [selectedTab,setSelectedTab]=useState("media");
 

  return (
    <div>
      <div className={style.mainContaienr}>
      <section className={style.sectionTop}>
        <div className={style.avatarContainer}>
          <img src={data.profile?data.profile:".././assets/noDp.png"} alt="profile" className={style.avatar} />
        </div>
      </section>
      <section className={style.sectionBottom}>
        <div className={style.infoStripTop}>
          <div className={style.box}>
            <p className={style.heading}>{data.posts}</p>
            <p className={style.subheading}>POSTS</p>
          </div>
          <div className={style.box}>
            <p className={style.heading}>{data.followers}</p>
            <p className={style.subheading}>FOLLOWERS</p>
          </div>
          <div className={style.box}>
            <p className={style.heading}>{data.following}</p>
            <p className={style.subheading}>FOLLOWINGS</p>
          </div>
        </div>
        <div className={style.sectionContainer}>
          {/* left section */}
          <div className={style.section}>
            <div className={style.nameStrip}>
              <p className={`${style.heading3} flex items-center`}>
                {data.username}
                <span>
                  <ShieldCheck className={style.shield} />
                </span>
              </p>
              <p className={style.subheading}>
                {userid}
              </p>
            </div>
            <p className={`${style.text} ${style.accessInfoText}`}>{`Super admin view: Accessing all data for ${data.username}. Profile is currently ${data.privacy.toUpperCase()} to the public.`}</p>
            <div className={style.infoStripBottom}>
                <div className={style.Infosection}><Calendar className={style.icon2}/><span className={style.text}>{`joined ${data.joinDate}`}</span></div>
                <a className={style.Infosection}href={`mailto:${data.email}`} ><ExternalLink className={style.icon2}/><span className={style.text}>{data.email}</span></a>
            </div>
          </div>
          {/* right section */}
          <div className={style.section}>
            <p className={style.subheading2}>ACCOUNT HEALTH</p>
            <div className={style.healthContainer}>
              <span className={style.text}>Session Status</span>
              {data.fcmToken ? (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md tracking-wider">LOGGED IN</span>
              ) : (
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md tracking-wider">LOGGED OUT</span>
              )}
            </div>
            <div className={style.healthContainer}>
              <span className={style.text}>Reports</span>
              <span>0</span>
            </div>
            <div className={style.healthContainer}>
              <span className={style.text}>Violations</span>
              <span>0</span>
            </div>
            <div className={style.healthContainer}>
              <span className={style.text}>Account status</span>
              <span
                className={` ${data.status == "active" ? style.positiveText : style.warningText} ${style.text}`}
              >
                {data.status}
              </span>
            </div>
          </div>
        </div>
      </section>
      
    </div>
    
    <div className={style.mainContaienr}>
      <div className={style.selectionPan}>
        <div className={`${style.selector} ${selectedTab=="media" ?style.selectedTab:style.greyText}`} onClick={()=>{
          handleTabChange("media");
        }}><span>POSTS</span></div>
        <div className={`${style.selector} ${selectedTab=="stories" ?style.selectedTab:style.greyText}`} onClick={()=>{handleTabChange("stories")}}><span>STORIES</span></div>
        <div className={`${style.selector} ${selectedTab=="history" ?style.selectedTab:style.greyText}`} onClick={()=>{handleTabChange("history")}}><span>HISTORY</span></div>
        <div className={`${style.selector} ${selectedTab=="followers" ?style.selectedTab:style.greyText}`} onClick={()=>{handleTabChange("followers")}}><span>FOLLOWERS</span></div>
        <div className={`${style.selector} ${selectedTab=="followings" ?style.selectedTab:style.greyText}`} onClick={()=>{handleTabChange("followings")}}><span>FOLLOWINGS</span></div>
      </div>
      <div className={style.contentBox}>
        {selectedTab=="media"? <UserPosts /> :selectedTab=="stories" ? <UserStories />:selectedTab=="history" ? <UserHistory /> : selectedTab=="followers" ? <UserFollowers /> : selectedTab=="followings" ? <UserFollowings /> : <NoData/>}
      </div>
    </div>
    </div>
    
  );
}
