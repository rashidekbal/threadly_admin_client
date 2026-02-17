import React, { useEffect } from 'react'
import style from "./styles/PostCard.module.css";
import {

  MessageCircle,
  Heart,
  Eye,

} from "lucide-react";
export default function PostCard({data}) {

  return (
    <div className={style.mainContainer}>
            <div>
            <span className={`${style.floating} `}>{data.type}</span>
            <img className={style.img} src={data.previewUrl} alt='post'/>
            </div>
            <div>
                <p className={style.caption}>{data.caption}</p>
            </div>
            <div className={style.statsContainer}>
                <div className={style.section}>
                    <span className={style.text}><Eye className={style.icon}/> {data.views}</span>
                    <span className={style.text}><Heart className={style.icon}/> {data.views}</span>
                    <span className={style.text}><MessageCircle className={style.icon}/> {data.views}</span>
                </div>
                <div className={style.section}><span className={style.text}>{data.createdAt}</span></div>
            </div>
        </div>
  )
}
