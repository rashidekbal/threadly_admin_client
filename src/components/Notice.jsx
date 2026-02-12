import React, { use, useState } from 'react'
import style from "./styles/Notice.module.css";
import {Bell, AlertCircle, Info, MessageSquare, CheckCircle2, Clock, Trash2}from "lucide-react";
export default function Notice() {
    const [pendingMessage,setPendingMessage]=useState(0);
    const [isNoticeVisible,setIsNoticeVisible]=useState(false);
    const handleNoticeOpen=()=>{
        setIsNoticeVisible(!isNoticeVisible);
    }
  return (
    <div className={style.mainContainer}>
        <div className={`${style.iconSection}`}>
            <span className={style.iconHolder} onClick={handleNoticeOpen}><Bell className={`${style.icon}`}/>{pendingMessage>0&&<span className={style.countCircle}>{pendingMessage<=9?pendingMessage:'9+'}</span>}</span>
            <span className={style.iconHolder} onClick={handleNoticeOpen}><Info className={`${style.icon}`}/></span>
        </div>
        {isNoticeVisible&&<div className={`${style.noticePanel}`}>

        </div>}
        
    </div>
  )
}
