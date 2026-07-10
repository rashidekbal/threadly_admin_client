import React, { useEffect, useState } from 'react'
import style from "./styles/Notice.module.css";
import {Bell, AlertCircle, Info, MessageSquare, CheckCircle2, Clock, Trash2}from "lucide-react";

export default function Notice() {
    const [pendingMessage,setPendingMessage]=useState(0);
    const [unreadAnomalies, setUnreadAnomalies] = useState(0);
    const [isNoticeVisible,setIsNoticeVisible]=useState(false);

    useEffect(() => {
        const handleAnomaly = () => setUnreadAnomalies(prev => prev + 1);
        window.addEventListener("anomaly_received", handleAnomaly);
        return () => window.removeEventListener("anomaly_received", handleAnomaly);
    }, []);

    const handleNoticeOpen=()=>{
        setIsNoticeVisible(!isNoticeVisible);
    }
    
    const handleInfoClick = () => {
        setUnreadAnomalies(0);
        if (window.navigation) {
            window.navigation.navigate("/anomalies");
        } else {
            window.location.href = "/anomalies";
        }
    }
  return (
    <div className={style.mainContainer}>
        <div className={`${style.iconSection}`}>
            <span className={style.iconHolder} onClick={handleNoticeOpen}><Bell className={`${style.icon}`}/>{pendingMessage>0&&<span className={style.countCircle}>{pendingMessage<=9?pendingMessage:'9+'}</span>}</span>
            <span className={style.iconHolder} onClick={handleInfoClick}>
              <Info className={`${style.icon}`}/>
              {unreadAnomalies > 0 && <span className={style.countCircle}>{unreadAnomalies <= 9 ? unreadAnomalies : '9+'}</span>}
            </span>
        </div>
        {isNoticeVisible&&<div className={`${style.noticePanel}`}>

        </div>}
        
    </div>
  )
}
