import React from "react";
import style from "./styles/UserInfoEditor.module.css";
import {
  X,
  Save,
  User as UserIcon,
  Mail,
  Lock,
  ShieldAlert,
  Fingerprint,
  RefreshCw,
  Camera,
  Check,
} from "lucide-react";
export default function UserInfoEditor({data,toggle}) {
  return (
    <div className={`${style.mainContainer} hide-scroll`}>
      <div className={style.topStrip}>
        <div className={style.section}>
          <spna>
            <ShieldAlert className={style.ShieldAlert} />
          </spna>
        </div>
        <div className={style.section}>
          
            <p className={style.heading}>Manage User Identity</p>
            <p className={style.subheading}>Overriding system constraints for {data.userid}</p>
        
        </div>
        <div className={style.section}><span onClick={()=>{
            toggle(false)
        }}><X className={style.icon}/></span></div>
      </div>

      <div className={`${style.profileSection} gap-[15px]`}>
        <section className={style.profileImageHolder}><img className={style.profileImg} src={data.profile}/></section>
        <section>
            <p className={style.heading3}>Profile Media</p>
            <p className={style.subheading}>Change the user's public profile pic</p>
            <div>
                <button className={style.btn}>
                    Upload new 
                </button>
                <button className={style.btn}>
                    Remove
                </button>
            </div>
        </section>
      </div>
    </div>
  );
}
