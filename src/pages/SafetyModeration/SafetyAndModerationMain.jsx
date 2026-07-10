import React, { useEffect, useState } from "react";
import style from "./SafetyAndModerationMain.module.css";
import DashBoardHeading from "../../components/DashBoardHeading";
import ReportCard from "../../components/ReportCard";
import ConfirmDialog from "../../components/ConfirmDialog";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getReports, updateReportStatus } from "../../repository/ReportsRepo.js";
import { deletePost } from "../../repository/PostsRepo.js";

export default function SafetyAndModerationMain() {
  const [activeTab, setActiveTab] = useState("pending");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    fetchReports(activeTab);
  }, [activeTab]);

  function fetchReports(status) {
    setLoading(true);
    getReports(status, {
      success: (result) => {
        setReports(result.data.data);
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching reports");
        setLoading(false);
      },
    });
  }

  function handleDismiss(reportid) {
    setConfirm({
      message: "dismiss this report? it will be marked as dismissed.",
      danger: false,
      onConfirm: () => {
        setConfirm(null);
        updateReportStatus(reportid, "dismissed", {
          onSuccess: () => {
            setReports((prev) => prev.filter((r) => r.reportid !== reportid));
            toast.success("report dismissed");
          },
          onError: () => toast.error("error updating report"),
        });
      },
    });
  }

  function handleDeletePost(postid, reportid) {
    setConfirm({
      message: "delete this post? this will permanently remove the post and mark the report as reviewed.",
      onConfirm: () => {
        setConfirm(null);
        deletePost(postid, {
          onSuccess: () => {
            updateReportStatus(reportid, "reviewed", {
              onSuccess: () => {
                setReports((prev) => prev.filter((r) => r.reportid !== reportid));
                toast.success("post deleted and report marked reviewed");
              },
              onError: () => toast.error("post deleted but error updating report"),
            });
          },
          onError: () => toast.error("error deleting post"),
        });
      },
    });
  }

  const tabs = ["pending", "reviewed", "dismissed"];

  return (
    <div className={style.mainContainer}>
      <ConfirmDialog
        open={confirm !== null}
        message={confirm?.message}
        danger={confirm?.danger !== false}
        onConfirm={confirm?.onConfirm}
        onCancel={() => setConfirm(null)}
      />

      <DashBoardHeading
        heading="Safety & Moderation"
        subHeading="Review reported content and take action"
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
          ) : reports.length === 0 ? (
            <p className={style.emptyText}>no {activeTab} reports</p>
          ) : (
            reports.map((report) => (
              <ReportCard
                key={report.reportid}
                data={report}
                onDismiss={handleDismiss}
                onDeletePost={handleDeletePost}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
