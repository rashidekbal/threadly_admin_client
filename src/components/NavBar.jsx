import style from "./styles/NavBar.module.css";
import { useEffect, useState } from "react";
 import {Search ,Bell, ShieldAlert, AlertCircle, Info, MessageSquare, CheckCircle2, Clock, Trash2}from "lucide-react";
import Notice from "./Notice";
export default function NavBar() {
  return (
    <div className={style.mainContainer}>
      <div className={style.section}>
       {/* Deep search removed as requested */}
      </div>
      <div className={style.section}>
        <Notice/>
      </div>
    </div>
  );
}
