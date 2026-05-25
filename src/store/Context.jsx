import React, { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../repository/Users.Repo";
import { toast } from "react-toastify";
import { getSecretTokenLocalStorage } from "../utils/localStorageUtil";
import { getSecretToken } from "../utils/SessionStorageUtil";
const data = createContext();
export default function Context({ children }) {
  const [users,setUsers] =useState([]);
  useEffect(()=>{
if(users.length!=0&&!(getSecretTokenLocalStorage()||getSecretToken()))return;
  getAllUsers({
        success:(result)=>{
          setUsers(result.data.data);
       

        },
        error:(err)=>{
          console.log(err)
          
          
        }
      })
  },[])
  return (
    <data.Provider value={{ name: "rashid", users, setUsers }}>
      {children}
    </data.Provider>
  );
}
export { data };
