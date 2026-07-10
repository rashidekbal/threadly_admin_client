import React, { useEffect, useState } from "react";
import style from "./GlobalContentMain.module.css";
import DashBoardHeading from "../../components/DashBoardHeading";
import PostCard from "../../components/PostCard";
import CommentCard from "../../components/CommentCard";
import PostViewDialog from "../../components/PostViewDialog";
import Dialog from "../../components/Dialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getAllPosts, deletePost } from "../../repository/PostsRepo.js";
import { getPostComments, deleteComment } from "../../repository/PostCommentRepo.js";
import { Trash2 } from "lucide-react";

export default function GlobalContentMain() {
  const [activeTab, setActiveTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [previewData, setPreviewData] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingComments, setLoadingComments] = useState(false);
  const [selectedPostid, setSelectedPostid] = useState(null);
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  function fetchPosts() {
    setLoadingPosts(true);
    getAllPosts({
      success: (result) => {
        setPosts(result.data.data);
        setLoadingPosts(false);
      },
      error: (err) => {
        toast.error("error fetching posts");
        setLoadingPosts(false);
      },
    });
  }

  function fetchComments(postid) {
    setLoadingComments(true);
    setSelectedPostid(postid);
    setActiveTab("comments");
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
            setPosts((prev) => prev.filter((p) => p.postid !== postid));
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
    <div className={style.mainContainer}>
      <ConfirmDialog
        open={confirm !== null}
        message={confirm?.message}
        onConfirm={confirm?.onConfirm}
        onCancel={() => setConfirm(null)}
      />

      <Dialog open={previewData !== null}>
        {previewData && (
          <PostViewDialog data={previewData} toggle={setPreviewData} />
        )}
      </Dialog>

      <DashBoardHeading
        heading="Global Content"
        subHeading="Browse and moderate all posts and comments on the platform"
      />

      <div className={style.viewContainer}>
        <div className={style.tabBar}>
          <div
            className={`${style.tab} ${activeTab === "posts" ? style.activeTab : ""}`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </div>
          <div
            className={`${style.tab} ${activeTab === "comments" ? style.activeTab : ""}`}
            onClick={() => {
              if (selectedPostid) {
                setActiveTab("comments");
              } else {
                toast.info("select a post first to view its comments");
              }
            }}
          >
            Comments {selectedPostid ? `(post #${selectedPostid})` : ""}
          </div>
        </div>

        {activeTab === "posts" && (
          <div>
            {loadingPosts ? (
              <div className={style.loaderContainer}>
                <HashLoader color="#4F39F6" />
              </div>
            ) : (
              <div className={style.postsGrid}>
                {posts.map((post) => (
                  <div key={post.postid} className={style.postWrapper}>
                    <PostCard
                      data={post}
                      setPreviewData={(data) => {
                        setPreviewData(data);
                        fetchComments(data.postid);
                      }}
                    />
                    <div className={style.postActions}>
                      <span
                        className={style.actionText}
                        onClick={() => fetchComments(post.postid)}
                      >
                        View Comments
                      </span>
                      <Trash2
                        className={style.deleteIcon}
                        onClick={() => handleDeletePost(post.postid)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "comments" && (
          <div className={style.commentsContainer}>
            {loadingComments ? (
              <div className={style.loaderContainer}>
                <HashLoader color="#4F39F6" />
              </div>
            ) : comments.length === 0 ? (
              <p className={style.emptyText}>no comments on this post</p>
            ) : (
              comments.map((comment) => (
                <div key={comment.commentid} className={style.commentWrapper}>
                  <CommentCard data={comment} />
                  <div className={style.commentActions}>
                    <Trash2
                      className={style.deleteIcon}
                      onClick={() => handleDeleteComment(comment.commentid)}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
