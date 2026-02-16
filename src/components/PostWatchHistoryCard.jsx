import React from "react";
import style from "./styles//PostWatchHistoryCard.module.css";
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
  Edit,
} from "lucide-react";
export default function PostWatchHistoryCard({ data }) {
  return (
    <div className={style.mainContainer}>
      <div className={style.section}>
        <img className={style.imageView} src={data.previewUrl} />
        <div className={style.innerSection}>
          <p>Post Reference ID: {data.postid}</p>
          <div><span>
            <Clock className={style.icon} />
          </span>
          <span className={style.text}>Watched 10s</span>
          <span>
            <Calendar className={style.icon} />
          </span>
          <span className={style.text}>{data.createdAt}</span></div>
          
        </div>
      </div>
      <div className={style.section}>
        <span>completed</span>
      </div>
    </div>
  );
}
