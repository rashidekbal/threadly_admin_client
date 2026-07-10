import React, { useEffect, useState } from "react";
import style from "./UserHistory.module.css";
import { useParams } from "react-router";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getUserActivity } from "../../repository/Users.Repo.js";
import { generatePreviewUrl } from "../../utils/Cloudinary.util.js";
import { formateToNormalDateTime } from "../../utils/dateUtil.js";
import Dialog from "../../components/Dialog";
import PostViewDialog from "../../components/PostViewDialog";
import { getSinglePost } from "../../repository/PostsRepo.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [previewPost, setPreviewPost] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleHistoryItemClick = (item) => {
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
    getUserActivity(userid, page, {
      success: (result) => {
        const data = result.data.data;
        setLog(data);
        setHasMore(data.length === 20); // 20 is the LIMIT set in backend
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching activity log");
        setLoading(false);
      },
    });
  }, [userid, page]);

  if (loading) {
    return (
      <div className={style.loaderContainer}>
        <HashLoader color="#4F39F6" />
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      <Dialog open={previewPost != null}>
        {previewPost != null && (
          <PostViewDialog toggle={setPreviewPost} data={previewPost} />
        )}
      </Dialog>
      {log.length === 0 ? (
        <p className={style.emptyText}>no activity found for this user</p>
      ) : (
        log.map((item, i) => (
          <div
            key={i}
            className={`${style.logItem} ${item.relatedId ? "cursor-pointer hover:bg-slate-50 transition-colors" : ""}`}
            onClick={() => handleHistoryItemClick(item)}
            style={{ opacity: fetchingPost ? 0.6 : 1, pointerEvents: fetchingPost ? 'none' : 'auto' }}
          >
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
      
      {log.length > 0 && (
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
  );
}
