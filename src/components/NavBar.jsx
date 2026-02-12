import style from "./styles/NavBar.module.css";
import { useEffect, useState } from "react";
 import {Search ,Bell, ShieldAlert, AlertCircle, Info, MessageSquare, CheckCircle2, Clock, Trash2}from "lucide-react";
import Notice from "./Notice";
export default function NavBar() {
  return (
    <div className={style.mainContainer}>
      <div className={style.section}>
       <div className={style.inputHolder}>
         <div className={style.inputContainerMain}>
          <span><Search className={style.icon}/></span>
          <input type="text" placeholder="Deep search"/></div>
       </div>
      </div>
      <div className={style.section}>
        <Notice/>
      </div>
    </div>
  );
}
