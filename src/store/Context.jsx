import React, { createContext, useEffect, useState } from "react";
import { getAllUsers } from "../repository/Users.Repo";
import { toast } from "react-toastify";
const data = createContext();
export default function Context({ children }) {
  const [users,setUsers] =useState([]);
  useEffect(()=>{
if(users.length!=0)return;
  getAllUsers({
        success:(result)=>{
          setUsers(result.data.data);
       

        },
        error:(err)=>{
          console.log(err)
          toast.error("error fetching users "+err.message)
          
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
