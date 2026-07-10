import React, { useEffect, useState } from "react";
import style from "./UserHistory.module.css";
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getUserActivity } from "../../repository/Users.Repo.js";
import { generatePreviewUrl } from "../../utils/Cloudinary.util.js";
import { formateToNormalDateTime } from "../../utils/dateUtil.js";

const typeBadgeColor = {
  post: "#4f46e5",
  comment: "#06b6d4",
  like: "#e11d48",
  story: "#f59e0b",
};

export default function UserHistory() {
  const { userid } = useParams();
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserActivity(userid, {
      success: (result) => {
        setLog(result.data.data);
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching activity log");
        setLoading(false);
      },
    });
  }, [userid]);

  if (loading) {
    return (
      <div className={style.loaderContainer}>
        <HashLoader color="#4F39F6" />
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      {log.length === 0 ? (
        <p className={style.emptyText}>no activity found for this user</p>
      ) : (
        log.map((item, i) => (
          <div key={i} className={style.logItem}>
            {item.media ? (
              <img src={generatePreviewUrl(item.media)} alt="media" className={style.media} loading="lazy" />
            ) : (
              <div className={style.mediaPlaceholder} />
            )}
            <div className={style.info}>
              <span
                className={style.typeBadge}
                style={{ backgroundColor: typeBadgeColor[item.type] || "#64748b" }}
              >
                {item.type}
              </span>
              <p className={style.detail}>{item.detail || "—"}</p>
              <p className={style.time}>{formateToNormalDateTime(item.time)}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
