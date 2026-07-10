import style from "./UserPosts.module.css";
import PostCard from "../../components/PostCard";
import NoData from "../../components/NoData";
import Dialog from "../../components/Dialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import CommentCard from "../../components/CommentCard";
  import { useState, useEffect } from "react";
import PostViewDialog from "../../components/PostViewDialog";
import { Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { deletePost } from "../../repository/PostsRepo.js";
import { getPostComments, deleteComment } from "../../repository/PostCommentRepo.js";
import { HashLoader } from "react-spinners";
import { useParams } from "react-router";
import { getUserAllPosts } from "../../repository/UserPostsRepo.js";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function UserPosts() {
  const { userid } = useParams();
  const [currentPostPreview, setCurrentPostPreview] = useState(null);
  const [commentsOpen, setCommentsOpen] = useState(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [localPosts, setLocalPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Sync when prop changes
  useEffect(() => {
    setLoadingPosts(true);
    getUserAllPosts(userid, page, {
      success: (result) => {
        const data = result.data.data;
        setLocalPosts(data);
        setHasMore(data.length === 15); // backend LIMIT 15
        setLoadingPosts(false);
      },
      error: () => {
        toast.error("error fetching user posts");
        setLoadingPosts(false);
      },
    });
  }, [userid, page]);

  function fetchComments(postid) {
    setCommentsOpen(postid);
    setLoadingComments(true);
    getPostComments(postid, {
      onSuccess: (result) => {
        setComments(result.data.data);
        setLoadingComments(false);
      },
      onError: () => {
        toast.error("error fetching comments");
        setLoadingComments(false);
      },
    });
  }

  function handleDeletePost(postid) {
    setConfirm({
      message: "delete this post? this action cannot be undone.",
      onConfirm: () => {
        setConfirm(null);
        deletePost(postid, {
          onSuccess: () => {
            setLocalPosts((prev) => prev.filter((p) => p.postid !== postid));
            toast.success("post deleted");
          },
          onError: () => toast.error("error deleting post"),
        });
      },
    });
  }

  function handleDeleteComment(commentid) {
    setConfirm({
      message: "delete this comment? this action cannot be undone.",
      onConfirm: () => {
        setConfirm(null);
        deleteComment(commentid, {
          onSuccess: () => {
            setComments((prev) => prev.filter((c) => c.commentid !== commentid));
            toast.success("comment deleted");
          },
          onError: () => toast.error("error deleting comment"),
        });
      },
    });
  }

  return (
    <>
      <ConfirmDialog
        open={confirm !== null}
        message={confirm?.message}
        onConfirm={confirm?.onConfirm}
        onCancel={() => setConfirm(null)}
      />

      <Dialog open={currentPostPreview != null}>
        {currentPostPreview != null && (
          <PostViewDialog toggle={setCurrentPostPreview} data={currentPostPreview} />
        )}
      </Dialog>

      <Dialog open={commentsOpen != null}>
        <div className={style.commentsDialog}>
          <div className={style.commentsHeader}>
            <span>Comments</span>
            <X className={style.closeIcon} onClick={() => setCommentsOpen(null)} />
          </div>
          {loadingComments ? (
            <div className="flex justify-center items-center h-40">
              <HashLoader color="#4F39F6" />
            </div>
          ) : comments.length > 0 ? (
            <div className={style.commentsList}>
              {comments.map((comment) => (
                <div key={comment.commentid} className="relative">
                  <CommentCard data={comment} />
                  <Trash2
                    size={16}
                    className="absolute top-4 right-4 text-orange-500 cursor-pointer hover:text-orange-700"
                    onClick={() => handleDeleteComment(comment.commentid)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-slate-500">No comments on this post</div>
          )}
        </div>
      </Dialog>
          {loadingPosts ? (
            <div className="flex justify-center items-center h-40">
              <HashLoader color="#4F39F6" />
            </div>
          ) : localPosts.length > 0 ? (
            <div className={style.mainContainer}>
              {localPosts.map((item) => (
                <PostCard data={item} key={item.postid} setPreviewData={setCurrentPostPreview}>
                  <div className={style.postActions} onClick={(e) => e.stopPropagation()}>
                    <span
                      className={style.actionText}
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchComments(item.postid);
                      }}
                    >
                      View Comments
                    </span>
                    <Trash2
                      className={style.deleteIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeletePost(item.postid);
                      }}
                    />
                  </div>
                </PostCard>
              ))}
            </div>
          ) : (
            <NoData />
          )}

          {!loadingPosts && localPosts.length > 0 && (
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
    </>
  );
}
