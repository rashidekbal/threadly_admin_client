import React, { useEffect, useState } from "react";
import style from "./WatchLogsMain.module.css";
import DashBoardHeading from "../../components/DashBoardHeading";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getPlatformActivity } from "../../repository/ActivityLogRepo.js";
import { generatePreviewUrl } from "../../utils/Cloudinary.util.js";
import { formateToNormalDateTime } from "../../utils/dateUtil.js";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "../../components/Dialog";
import PostViewDialog from "../../components/PostViewDialog";
import { getSinglePost } from "../../repository/PostsRepo.js";

const typeBadgeColor = {
  post: "#4f46e5",
  comment: "#06b6d4",
  like: "#e11d48",
  story: "#f59e0b",
};

export default function WatchLogsMain() {
  const [log, setLog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [previewPost, setPreviewPost] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(false);

  const handleLogItemClick = (item) => {
    if (item.relatedId) {
      setFetchingPost(true);
      getSinglePost(item.relatedId, {
        onSuccess: (res) => {
          if (res.data.data && res.data.data.length > 0) {
            setPreviewPost(res.data.data[0]);
          } else {
            toast.error("post not found or deleted");
          }
          setFetchingPost(false);
        },
        onError: () => {
          toast.error("failed to load post");
          setFetchingPost(false);
        },
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    getPlatformActivity(page, {
      success: (result) => {
        const data = result.data.data;
        setLog(data);
        setHasMore(data.length === 20); // matching backend limit
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching activity log");
        setLoading(false);
      },
    });
  }, [page]);

  return (
    <div className={style.mainContainer}>
      <Dialog open={previewPost != null}>
        {previewPost != null && (
          <PostViewDialog toggle={setPreviewPost} data={previewPost} />
        )}
      </Dialog>
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
              <div 
                key={i} 
                className={`${style.logItem} ${item.relatedId ? "cursor-pointer hover:bg-slate-50 transition-colors" : ""}`}
                onClick={() => handleLogItemClick(item)}
                style={{ opacity: fetchingPost ? 0.6 : 1, pointerEvents: fetchingPost ? 'none' : 'auto' }}
              >
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
        {!loading && log.length > 0 && (
          <div className="flex justify-between items-center mt-6 py-4 border-t border-slate-100">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center px-4 py-2 border rounded-md text-sm text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={16} className="mr-1" /> Previous
            </button>
            <span className="text-sm text-slate-500 font-medium">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className="flex items-center px-4 py-2 border rounded-md text-sm text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
            >
              Next <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
