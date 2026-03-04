import React, { useEffect } from "react";
import style from "./styles/PostCard.module.css";
import { MessageCircle, Heart, Eye } from "lucide-react";
import { generatePreviewUrl } from "../utils/Cloudinary.util";
export default function PostCard({ data, setPreviewData }) {
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
    </div>
  );
}
