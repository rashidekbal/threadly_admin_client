import React from "react";
import Dialog from "./Dialog";
import style from "./styles/ConfirmDialog.module.css";
import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({ open, message, onConfirm, onCancel, danger = true }) {
  return (
    <Dialog open={open}>
      <div className={style.container}>
        <div className={`${style.iconWrap} ${danger ? style.dangerIcon : style.infoIcon}`}>
          <AlertTriangle className={style.icon} />
        </div>
        <p className={style.message}>{message}</p>
        <div className={style.actions}>
          <button className={style.cancelBtn} onClick={onCancel}>
            Cancel
          </button>
          <button className={`${style.confirmBtn} ${danger ? style.dangerBtn : style.primaryBtn}`} onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </Dialog>
  );
}
