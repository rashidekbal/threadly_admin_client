import React, { useEffect, useState } from "react";
import Dialog from "./Dialog";
import style from "./styles/SystemScanDialog.module.css";
import { ShieldCheck, AlertTriangle, ShieldAlert, X } from "lucide-react";
import { getSystemScan } from "../repository/statsRepo";
import { HashLoader } from "react-spinners";

export default function SystemScanDialog({ open, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setData(null);
      setError(null);
      setLoading(true);
      getSystemScan({
        onSuccess: (res) => {
          setData(res.data.data);
          setLoading(false);
        },
        onError: (err) => {
          setError("Failed to run system scan");
          setLoading(false);
        },
      });
    }
  }, [open]);


  return (
    <Dialog open={open}>
      <div className={style.container}>
        <div className={style.header}>
          <div className={style.titleWrapper}>
            <ShieldCheck className={style.icon} />
            <h2>System Scan</h2>
          </div>
          <X className={style.closeIcon} onClick={onClose} />
        </div>

        <div className={style.content}>
          {loading && (
            <div className={style.centerContent}>
              <HashLoader color="#4F39F6" />
              <p className={style.loadingText}>Running diagnostics...</p>
            </div>
          )}

          {error && (
            <div className={style.centerContent}>
              <p className={style.errorText}>{error}</p>
            </div>
          )}

          {data && (
            <>
              <div className={style.statusBanner} data-status={data.overallStatus}>
                {data.overallStatus === "ok" && <ShieldCheck className={style.statusIcon} />}
                {data.overallStatus === "warn" && <AlertTriangle className={style.statusIcon} />}
                {data.overallStatus === "alert" && <ShieldAlert className={style.statusIcon} />}
                <span>
                  System is{" "}
                  {data.overallStatus === "ok"
                    ? "Healthy"
                    : data.overallStatus === "warn"
                    ? "experiencing minor issues"
                    : "critical"}
                </span>
              </div>
              
              <div className={style.checksList}>
                {data.checks.map((check, i) => (
                  <div key={i} className={style.checkRow}>
                    <div className={style.checkLabel}>{check.label}</div>
                    <div className={style.checkValueWrapper}>
                      <span className={style.checkValue}>{check.value}</span>
                      <span className={style.badge} data-status={check.status}>
                        {check.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className={style.timestamp}>Scanned at: {new Date(data.scannedAt).toLocaleString()}</p>
            </>
          )}
        </div>
      </div>
    </Dialog>
  );
}
