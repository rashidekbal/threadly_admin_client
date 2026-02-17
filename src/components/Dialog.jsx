import React, { useEffect, useRef } from 'react'
import style from "./styles/Dialog.module.css"
export default function Dialog({children,open}) {
    const dialogRef=useRef(null);
    useEffect(()=>{
        if(!open)return handleClose();
        dialogRef.current.showModal();
        return ()=>{
            handleClose();
        }
    },[open]);
   const handleClose=()=>{
    dialogRef.current.close();
   }
  return (
    <dialog ref={dialogRef} className={style.mainContainer} >
        {children}
    </dialog>
  )
}
