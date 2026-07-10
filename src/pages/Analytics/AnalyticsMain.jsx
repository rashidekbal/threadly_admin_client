import React, { useEffect, useState } from "react";
import style from "./AnalyticsMain.module.css";
import DashBoardHeading from "../../components/DashBoardHeading";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getAnalytics } from "../../repository/statsRepo.js";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Dialog from "../../components/Dialog";
import PostViewDialog from "../../components/PostViewDialog";
import { getSinglePost } from "../../repository/PostsRepo.js";
import { useNavigate } from "react-router";

export default function AnalyticsMain() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usersPage, setUsersPage] = useState(1);
  const [postsPage, setPostsPage] = useState(1);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  
  const [previewPost, setPreviewPost] = useState(null);
  const [fetchingPost, setFetchingPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnalytics(usersPage, postsPage);
  }, [usersPage, postsPage]);

  function fetchAnalytics(up, pp) {
    if (!data) setLoading(true);
    getAnalytics(up, pp, {
      success: (result) => {
        const d = result.data.data;
        setData(d);
        setHasMoreUsers(d.topUsers?.length === 10);
        setHasMorePosts(d.topPosts?.length === 10);
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching analytics");
        setLoading(false);
      },
    });
  }

  const handlePostClick = (postid) => {
    setFetchingPost(true);
    getSinglePost(postid, {
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
  };

  if (loading) {
    return (
      <div className={style.mainContainer}>
        <DashBoardHeading heading="Analytics" subHeading="Platform growth and engagement trends" />
        <div className={style.loaderContainer}>
          <HashLoader color="#4F39F6" />
        </div>
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
      <DashBoardHeading heading="Analytics" subHeading="Platform growth and engagement trends" />

      <div className={style.viewContainer}>
        <div className={style.chartsRow}>
          <div className={style.chartBox}>
            <p className={style.chartTitle}>New Signups — Last 30 Days</p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data?.signups || []}>
                <defs>
                  <linearGradient id="colorSignups" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }} itemStyle={{ fontSize: "12px" }} />
                <Area type="monotone" dataKey="signups" stroke="#4f46e5" fillOpacity={1} fill="url(#colorSignups)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={style.chartBox}>
            <p className={style.chartTitle}>Posts Created — Last 30 Days</p>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={data?.posts || []}>
                <defs>
                  <linearGradient id="colorPosts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }} itemStyle={{ fontSize: "12px" }} />
                <Area type="monotone" dataKey="posts" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPosts)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={style.tablesRow}>
          <div className={style.tableBox}>
            <p className={style.chartTitle}>Top 100 Users by Followers</p>
            <table className={style.table}>
              <thead>
                <tr>
                  <th className={style.th}>#</th>
                  <th className={style.th}>User</th>
                  <th className={style.th}>Followers</th>
                </tr>
              </thead>
              <tbody>
                {(data?.topUsers || []).map((user, i) => (
                  <tr 
                    key={user.userid} 
                    className={`${style.tr} cursor-pointer hover:bg-slate-50 transition-colors`}
                    onClick={() => navigate(`/userdirectory/${user.userid}`)}
                  >
                    <td className={style.td}><span className={style.rank}>{(usersPage - 1) * 10 + i + 1}</span></td>
                    <td className={style.td}>
                      <div className={style.userCell}>
                        <img src={user.profile || "./assets/noDp.png"} alt="profile" className={style.avatar} />
                        <div>
                          <p className={style.username}>{user.username}</p>
                          <p className={style.userid}>{user.userid}</p>
                        </div>
                      </div>
                    </td>
                    <td className={style.td}><span className={style.count}>{user.followers}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 py-2">
              <button
                onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                disabled={usersPage === 1}
                className="flex items-center px-2 py-1 border rounded-md text-xs text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronLeft size={14} className="mr-1" /> Prev
              </button>
              <span className="text-xs text-slate-500">Page {usersPage}</span>
              <button
                onClick={() => setUsersPage((p) => p + 1)}
                disabled={!hasMoreUsers}
                className="flex items-center px-2 py-1 border rounded-md text-xs text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>

          <div className={style.tableBox}>
            <p className={style.chartTitle}>Top 100 Posts by Likes</p>
            <table className={style.table}>
              <thead>
                <tr>
                  <th className={style.th}>#</th>
                  <th className={style.th}>Post</th>
                  <th className={style.th}>By</th>
                  <th className={style.th}>Likes</th>
                </tr>
              </thead>
              <tbody>
                {(data?.topPosts || []).map((post, i) => (
                  <tr 
                    key={post.postid} 
                    className={`${style.tr} cursor-pointer hover:bg-slate-50 transition-colors ${fetchingPost ? 'opacity-50 pointer-events-none' : ''}`}
                    onClick={() => handlePostClick(post.postid)}
                  >
                    <td className={style.td}><span className={style.rank}>{(postsPage - 1) * 10 + i + 1}</span></td>
                    <td className={style.td}>
                      <p className={style.caption}>{post.caption || `Post #${post.postid}`}</p>
                    </td>
                    <td className={style.td}>
                      <span 
                        className={`${style.userid} hover:underline`}
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/userdirectory/${post.userid}`);
                        }}
                      >
                        {post.username}
                      </span>
                    </td>
                    <td className={style.td}><span className={style.count}>{post.likes}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-between items-center mt-4 py-2">
              <button
                onClick={() => setPostsPage((p) => Math.max(1, p - 1))}
                disabled={postsPage === 1}
                className="flex items-center px-2 py-1 border rounded-md text-xs text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronLeft size={14} className="mr-1" /> Prev
              </button>
              <span className="text-xs text-slate-500">Page {postsPage}</span>
              <button
                onClick={() => setPostsPage((p) => p + 1)}
                disabled={!hasMorePosts}
                className="flex items-center px-2 py-1 border rounded-md text-xs text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                Next <ChevronRight size={14} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
