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
  AtSign,
} from "lucide-react";
export default function UserInfoEditor({ data, toggle }) {
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
          <p className={style.subheading}>
            Overriding system constraints for {data.userid}
          </p>
        </div>
        <div className={style.section}>
          <span
            onClick={() => {
              toggle(false);
            }}
          >
            <X className={`${style.icon} cursor-pointer`} />
          </span>
        </div>
      </div>

      <div className={`${style.profileSection} gap-3.75`}>
        <section className={style.profileImageHolder}>
          <img className={style.profileImg} src={data.profile} />
        </section>
        <section>
          <p className={style.heading3}>Profile Media</p>
          <p className={style.subheading}>
            Change the user's public profile pic
          </p>
          <div>
            <button className={style.btn}>Upload new</button>
            <button className={style.btn}>Remove</button>
          </div>
        </section>
      </div>
      {/* user basic details input section */}
      <div className=" w-full ">
        <div className=" w-full mt-12 flex gap-10 justify-between ">
          <div className=" w-full">
            <p className="text-slate-400 text-m">UNIQUE USER ID</p>
            <div
              className="flex  justify-between border border-slate-300 my-1
            py-2 px-4 rounded-xl align-middle
            "
            >
              <span>
                <Fingerprint className="h-5 text-slate-400" />
              </span>
              <input
                type="text"
                disabled
                value={data.uuid}
                className="text-slate-500 text-sm"
              />
              <span className="text-slate-400 text-sm">READONLY</span>
            </div>
          </div>
          <div className=" w-full">
            <p className="text-slate-400">SYSTEM USERID</p>
            <div
              className="flex  justify-between border border-slate-300 my-1
              py-2 px-4  rounded-xl
            "
            >
              <span>
                <AtSign className="h-5 text-slate-400"  />
               
              </span>
              <input
                type="text"
                value={data.userid}
                className="text-slate-500 text-sm w-full ml-2"
              />

            </div>
          </div>
        </div>
        <div className=" w-full">
            <div className=" w-full mt-8 flex gap-10 justify-between ">
          <div className=" w-full">
            <p className="text-slate-400 text-m">FULL DISPLAY NAME</p>
            <div
              className="flex  justify-between border border-slate-300 my-1
            py-2 px-4  rounded-xl align-middle
            "
            >
              <span>
                <UserIcon className="h-5 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="full name"
                value={data.username}
                className="text-slate-500 text-sm w-full ml-2"
              />
            </div>
          </div>
          <div className=" w-full">
            <p className="text-slate-400">VERIFIED EMAIL</p>
            <div
              className="flex  justify-between border border-slate-300 my-1
             py-2 px-4  rounded-xl
            "
            >
              <span>
                <Mail className="h-5 text-slate-400"  />
               
              </span>
              <input
                type="text"
                placeholder="Email"
                value={data.email}
                className="text-slate-500 text-sm w-full ml-2"
              />
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* password section */}
      <div className="my-10 mx-10">
        <div className="flex  gap-2 text-[1.2rem] "><span><Lock className="text-indigo-600 w-4 h-7"/></span>  Security Override</div>
        
        <p className={style.subheading2}>Forced password update (User will be notified of change)</p>
        {/* password input  */}
        <div className=" w-full">
            <div className=" w-full mt-8 flex gap-10 justify-between ">
          <div className=" w-full">
          
            <div
              className=" border border-slate-300 my-1
            py-2 px-4  rounded-xl align-middle
            "
            >
              <input
                type="text"
                placeholder="New Secure Password"
                className="text-slate-500 text-sm w-full ml-2"
              />
            </div>
          </div>
          <div className=" w-full">
            <div
              className=" border border-slate-300 my-1
             py-2 px-4  rounded-xl
            "
            >
              <input
                type="text"
                placeholder="Confirm New Password"
                className="text-slate-500 text-sm w-full ml-2"
              />
            </div>
          </div>
        </div>
        </div>
        {/* password override btn */}
        <div className="flex gap-2 text-sm bg-gray-500 py-2 justify-center rounded-2xl my-4 cursor-pointer"><span><RefreshCw className="h-5 text-white"/></span><p className="text-white">OVERRIDE & RE-ENCRYPT PASSWORD</p> </div>
        {/* general save btn */}
        <div className="w-full flex justify-between gap-45 pt-10">
          <div className="flex text-white bg-violet-700 w-full py-3.5 justify-center gap-4 rounded-3xl cursor-pointer ">
            <Save/><p>SAVE PROFILE CHANGES</p>
          </div>
          <button className="text-slate-500 cursor-pointer">CANCEL</button>
        </div>
      </div>
      </div>
  );
}
