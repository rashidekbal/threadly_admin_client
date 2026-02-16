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
export default function UserInfoTile() {
  const handleTabChange=(tab)=>{
    setSelectedTab(tab);

  }
  const { userid } = useParams();
  const [selectedTab,setSelectedTab]=useState("media");
  const userData = {
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

  return (
    <div>
      <div className={style.mainContaienr}>
      <section className={style.sectionTop}>
        <div className={style.avatarContainer}>
          <img src={userData.profile} alt="profile" className={style.avatar} />
        </div>
      </section>
      <section className={style.sectionBottom}>
        <div className={style.infoStripTop}>
          <div className={style.box}>
            <p className={style.heading}>{userData.posts}</p>
            <p className={style.subheading}>POSTS</p>
          </div>
          <div className={style.box}>
            <p className={style.heading}>{userData.followers}</p>
            <p className={style.subheading}>FOLLOWERS</p>
          </div>
          <div className={style.box}>
            <p className={style.heading}>{userData.following}</p>
            <p className={style.subheading}>FOLLOWINGS</p>
          </div>
        </div>
        <div className={style.sectionContainer}>
          {/* left section */}
          <div className={style.section}>
            <div className={style.nameStrip}>
              <p className={style.heading3}>
                {userData.username}
                <span>
                  <ShieldCheck className={style.shield} />
                </span>
              </p>
              <p className={style.subheading}>
                {userid}
              </p>
            </div>
            <p className={`${style.text} ${style.accessInfoText}`}>{`Super admin view: Accessing all data for ${userData.username}. Profile is currently ${userData.privacy.toUpperCase()} to the public.`}</p>
            <div className={style.infoStripBottom}>
                <div className={style.Infosection}><Calendar className={style.icon2}/><span className={style.text}>{`joined ${userData.joined}`}</span></div>
                <a className={style.Infosection}href={`mailto:${userData.email}`} ><ExternalLink className={style.icon2}/><span className={style.text}>{userData.email}</span></a>
            </div>
          </div>
          {/* right section */}
          <div className={style.section}>
            <p className={style.subheading2}>ACCOUNT HEALTH</p>
            <div className={style.healthContainer}>
              <span className={style.text}>Reports</span>
              <span>{userData.reports}</span>
            </div>
            <div className={style.healthContainer}>
              <span className={style.text}>Violations</span>
              <span>{userData.violations}</span>
            </div>
            <div className={style.healthContainer}>
              <span className={style.text}>Account status</span>
              <span
                className={` ${userData.status == "active" ? style.positiveText : style.warningText} ${style.text}`}
              >
                {userData.status}
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
      </div>
      <div className={style.contentBox}>
        {selectedTab=="media"? <UserPosts/> :selectedTab=="stories" ? <UserStories/>:<UserHistory/>}
      </div>
    </div>
    </div>
    
  );
}
