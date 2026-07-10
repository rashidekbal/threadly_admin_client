import React, { useEffect } from "react";
import style from "./styles/PostCard.module.css";
import { MessageCircle, Heart, Eye } from "lucide-react";
import { generatePreviewUrl } from "../utils/Cloudinary.util";
import { useNavigate } from "react-router";

export default function PostCard({ data, setPreviewData, children }) {
  const navigate = useNavigate();
  function formatDate(date) {
    return date.split("T")[0];
  }
  function handleItemSelect(data) {
    setPreviewData(data);
  }

  return (
    <div
      className={`${style.mainContainer} cursor-pointer`}
      onClick={() => {
        handleItemSelect(data);
      }}
    >
      <div>
        <span className={`${style.floating} `}>{data.type}</span>
        
        {data.username && (
          <div 
            className={style.userSection}
            onClick={(e) => {
              e.stopPropagation();
              if (data.userid) {
                navigate(`/userdirectory/${data.userid}`);
              }
            }}
          >
            <img 
              src={generatePreviewUrl(data.profile) || "https://ui-avatars.com/api/?name=" + data.username} 
              alt="profile" 
              className={style.profilePic} 
              loading="lazy"
            />
            <span className={style.username}>{data.username}</span>
          </div>
        )}
        <img
          className={style.img}
          src={generatePreviewUrl(data.imageurl)}
          alt="post"
          loading="lazy"
        />
      </div>
      <div>
        <p className={style.caption}>{data.caption}</p>
      </div>
      <div className={style.statsContainer}>
        <div className={style.section}>
          <span className={style.text}>
            <Eye className={style.icon} /> {data.viewsCount}
          </span>
          <span className={style.text}>
            <Heart className={style.icon} /> {data.likesCount}
          </span>
          <span className={style.text}>
            <MessageCircle className={style.icon} /> {data.commentsCount}
          </span>
        </div>
        <div className={style.section}>
          <span className={style.text}>{formatDate(data.created_at)}</span>
        </div>
      </div>
      {children}
    </div>
  );
}
