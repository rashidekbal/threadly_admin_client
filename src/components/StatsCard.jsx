import React from "react";
import style from "./styles/StatsCard.module.css";
import{  ArrowUpRight, 
  ArrowDownRight 
} from 'lucide-react';
export default function StatsCard({ title, value, change, icon:Icon, trend }) {
  return <div className={style.mainContainer}>
    <div className={style.section1}>
        <div className={style.innerSection}><Icon className={style.icon}/></div>
        <div className={style.innerSection} style={trend == "up"?{color:"green",}:{color:"red"}}>{trend=="up"?<ArrowUpRight className={style.arrow}/>:<ArrowDownRight className={style.arrow}/>}<span>{change}</span></div>
    </div>
    <div className={style.titleHolder}>
        <p className={style.title}>{title}</p>
        <p className={style.value}>{value}</p>
    </div>
  </div>;
}
