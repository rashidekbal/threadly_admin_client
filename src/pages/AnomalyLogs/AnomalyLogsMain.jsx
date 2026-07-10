import React, { useEffect, useState } from "react";
import style from "./AnomalyLogsMain.module.css";
import DashBoardHeading from "../../components/DashBoardHeading";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getAnomalies, resolveAnomaly } from "../../repository/AnomalyRepo.js";
import { ShieldAlert, Check } from "lucide-react";
import { formateToNormalDateTime } from "../../utils/dateUtil.js";

export default function AnomalyLogsMain() {
  const [activeTab, setActiveTab] = useState("unresolved");
  const [anomalies, setAnomalies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnomalies(activeTab);
  }, [activeTab]);

  function fetchAnomalies(status) {
    setLoading(true);
    getAnomalies(status, {
      success: (result) => {
        setAnomalies(result.data.data);
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching anomalies");
        setLoading(false);
      },
    });
  }

  function handleResolve(anomalyId) {
    resolveAnomaly(anomalyId, {
      onSuccess: () => {
        setAnomalies((prev) => prev.filter((a) => a.anomaly_id !== anomalyId));
        toast.success("Anomaly marked as resolved");
      },
      onError: () => toast.error("error resolving anomaly"),
    });
  }

  const tabs = ["unresolved", "resolved"];

  return (
    <div className={style.mainContainer}>
      <DashBoardHeading
        heading="Anomaly Logs"
        subHeading="Review and resolve system errors and unexpected behavior"
      />

      <div className={style.viewContainer}>
        <div className={style.tabBar}>
          {tabs.map((tab) => (
            <div
              key={tab}
              className={`${style.tab} ${activeTab === tab ? style.activeTab : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </div>
          ))}
        </div>

        <div className={style.listContainer}>
          {loading ? (
            <div className={style.loaderContainer}>
              <HashLoader color="#4F39F6" />
            </div>
          ) : anomalies.length === 0 ? (
            <p className={style.emptyText}>No {activeTab} anomalies found</p>
          ) : (
            anomalies.map((item) => (
              <div key={item.anomaly_id} className={style.anomalyItem}>
                <div className={style.iconWrap}>
                  <ShieldAlert className={style.icon} />
                </div>
                <div className={style.info}>
                  <p className={style.errorMsg}>{item.error_message}</p>
                  <div className={style.metaRow}>
                    <span className={style.badge} data-severity={item.severity}>
                      {item.severity}
                    </span>
                    <span className={style.code}>Code: {item.error_code}</span>
                    <span className={style.path}>Path: {item.api_path}</span>
                    <span className={style.time}>{formateToNormalDateTime(item.createdAt)}</span>
                  </div>
                </div>
                {activeTab === "unresolved" && (
                  <button className={style.resolveBtn} onClick={() => handleResolve(item.anomaly_id)}>
                    <Check className={style.checkIcon} /> Resolve
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
