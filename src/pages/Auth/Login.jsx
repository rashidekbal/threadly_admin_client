import React, { useState } from "react";
import style from "./Login.module.css";
import { toast } from "react-toastify";
import { ShieldAlert, Lock, User, ArrowRight } from 'lucide-react';
import { LoginHandler } from "../../repository/AuthRepo.js";
import { getSecretToken, setSecretToken } from "../../utils/SessionStorageUtil.js";
import {MoonLoader} from "react-spinners";

export default function Login() {
  const [email,setEmail] = useState();
  const [password,setPassword]=useState();
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [isProcessing,setPocessing]=useState(false);
  const handleSuccess=(token)=>{
    setSecretToken(token);
    window.navigation.navigate("/dashboard");
  }
  const handleAuth = () => {
    if(!email||!password){return toast.error("please fill all the fields")};
    setPocessing(true);
    LoginHandler({email,password}, {
      onError: (error) => {
         setPocessing(false);
        toast.error(error);
        
      },
      onSuccess: (result) => {
         setPocessing(false);
        toast.success("authenticated");
        handleSuccess(result.data.token);
        setIsLoggedIn(true);
      },
    });
  };
  useState(()=>{
 if(getSecretToken()){window.navigation.navigate("/dashboard")}
  },[])
  return (
    <div className={`${style.mainContainer} ${style.mainContainerLight}`}>
      <div className={`${style.formContainer} ${style.fromContainerLight}`}>
        <ShieldAlert className={style.ShieldAlert}/>
        <div>
          <p className={style.heading}>SuperAdmin Login</p>
          <p className={style.subheading}>Enter credentials to access the platform controls</p>
        </div>
        <div className={style.inputHolder}>
          <p className={style.label}>ADMIN EMAIL</p>
          <div className={style.inputContainerMain}>
              <span><User className={style.icon}/></span>
              <input type="email" placeholder="Email" className={style.inputField}
              onChange={(e)=>{
                setEmail(e.target.value);
               
              }} value={email}/>
          </div>
        
        </div>
        <div className={style.inputHolder}>
          <p className={style.label}>SECURE PASSWORD</p>
          <div className={style.inputContainerMain}>
              <span><Lock className={style.icon}/></span>
              <input type="password" placeholder="Password" className={style.inputField} onChange={(e)=>{
                setPassword(e.target.value);
               
              }} value={password}/>
          </div>
        
        </div>
        <div className={style.inputHolder}>
          <input type="checkbox"/><span className={style.checkboxLabel}>Remember session</span>
          <span className={style.forgetKeyLabel}>Forgot Key?</span>

        </div>
      
                <div className={`${style.inputHolder} ${style.authButtonHolder}`}>
                  <button
          className={`${style.authBnt} ${style.authBtnDark}`}
          onClick={() => {
            handleAuth();
          }}
        >{!isProcessing&&" Authenticate"}
         
        </button>
       {isProcessing&& <MoonLoader className={style.Spinner} loading={true} size={20} color="white" />}</div>
        <div  className={style.inputHolder}>
         <p className={style.subheading2}>Authorized Personnel Only.</p> 
         <p  className={style.subheading2}>All access is logged and monitored via hardware security keys.</p>

        </div>
      </div>
    </div>
  );
}
