import React, { useState } from "react";
import style from "./Login.module.css";
import { toast } from "react-toastify";
import { LoginHandler } from "../../repository/AuthRepo.js";
import { getSecretToken, setSecretToken } from "../../utils/SessionStorageUtil.js";
export default function Login() {
  const [secret_key, setsecret_key] = useState();
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const handleSuccess=(token)=>{
    setSecretToken(token);
    window.navigation.navigate("/home");
  }
  const handleAuth = () => {
    if(!secret_key)return toast.error("please fill the secret key");
    LoginHandler({secret_key}, {
      onError: (error) => {
        toast.error(error);
      },
      onSuccess: (result) => {
        toast.success("authenticated");
        handleSuccess(result.data.token);
        setIsLoggedIn(true);
      },
    });
  };
  useState(()=>{
 if(getSecretToken()){window.navigation.navigate("/home")}
  },[])
  return (
    <div className={`${style.mainContainer} ${style.mainContainerDark}`}>
      <div className={`${style.formContainer} ${style.fromContainerDark}`}>
        <input
          type="text"
          placeholder="secret token"
          className={`${style.input} ${style.inputDark}`}
          onChange={(e)=>{
            setsecret_key(e.target.value);

          }}
        />
        <button
          className={`${style.authBnt} ${style.authBtnDark}`}
          onClick={() => {
            handleAuth();
          }}
        >
          Authenticate
        </button>
      </div>
    </div>
  );
}
