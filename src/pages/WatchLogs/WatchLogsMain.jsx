import React, { useEffect, useState } from "react";
import style from "./WatchLogsMain.module.css";
import DashBoardHeading from "../../components/DashBoardHeading";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getPlatformActivity } from "../../repository/ActivityLogRepo.js";
import { generatePreviewUrl } from "../../utils/Cloudinary.util.js";
import { formateToNormalDateTime } from "../../utils/dateUtil.js";

const typeBadgeColor = {
  post: "#4f46e5",
  comment: "#06b6d4",
  like: "#e11d48",
  story: "#f59e0b",
};

export default function WatchLogsMain() {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlatformActivity({
      success: (result) => {
        setLog(result.data.data);
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching activity log");
        setLoading(false);
      },
    });
  }, []);

  return (
    <div className={style.mainContainer}>
      <DashBoardHeading
        heading="Watch Logs"
        subHeading="Recent platform-wide activity feed"
      />

      <div className={style.viewContainer}>
        {loading ? (
          <div className={style.loaderContainer}>
            <HashLoader color="#4F39F6" />
          </div>
        ) : log.length === 0 ? (
          <p className={style.emptyText}>no recent activity</p>
        ) : (
          <div className={style.listContainer}>
            {log.map((item, i) => (
              <div key={i} className={style.logItem}>
                {item.media ? (
                  <img src={generatePreviewUrl(item.media)} alt="media" className={style.media} loading="lazy" />
                ) : (
                  <div className={style.mediaPlaceholder} />
                )}
                <div className={style.info}>
                  <div className={style.headerRow}>
                    <span
                      className={style.typeBadge}
                      style={{ backgroundColor: typeBadgeColor[item.type] || "#64748b" }}
                    >
                      {item.type}
                    </span>
                    <span className={style.userid}>{item.userid}</span>
                  </div>
                  <p className={style.detail}>{item.detail || "—"}</p>
                  <p className={style.time}>{formateToNormalDateTime(item.time)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
