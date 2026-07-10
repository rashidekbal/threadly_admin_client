import React from "react";
import style from "./styles/ReportCard.module.css";
import { generatePreviewUrl } from "../utils/Cloudinary.util.js";
import { Trash2, Check } from "lucide-react";

export default function ReportCard({ data, onDismiss, onDeletePost }) {
  return (
    <div className={style.mainContainer}>
      <div className={style.mediaSection}>
        {data.imageurl && (
          <img
            src={generatePreviewUrl(data.imageurl)}
            alt="reported post"
            className={style.thumbnail}
            loading="lazy"
          />
        )}
        <span className={style.typeBadge}>{data.type}</span>
      </div>

      <div className={style.infoSection}>
        <div className={style.row}>
          <p className={style.label}>Post</p>
          <p className={style.value}>#{data.postid} {data.caption ? `— ${data.caption}` : ""}</p>
        </div>
        <div className={style.row}>
          <p className={style.label}>Owner</p>
          <p className={style.value}>{data.postOwnerUsername} ({data.postOwnerUserid})</p>
        </div>
        <div className={style.row}>
          <p className={style.label}>Reported by</p>
          <p className={style.value}>{data.reporterUsername}</p>
        </div>
        <div className={style.row}>
          <p className={style.label}>Reason</p>
          <p className={style.reason}>{data.reason}</p>
        </div>
        <div className={style.row}>
          <p className={style.label}>Date</p>
          <p className={style.value}>{data.createdAt?.split("T")[0]}</p>
        </div>
      </div>

      <div className={style.actionsSection}>
        <div className={style.btn} onClick={() => onDismiss(data.reportid)}>
          <Check className={style.checkIcon} />
          <span>Dismiss</span>
        </div>
        <div className={`${style.btn} ${style.dangerBtn}`} onClick={() => onDeletePost(data.postid, data.reportid)}>
          <Trash2 className={style.trashIcon} />
          <span>Delete Post</span>
        </div>
      </div>
    </div>
  );
}
