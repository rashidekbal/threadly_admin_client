import React, { useEffect, useState } from "react";
import style from "./AnalyticsMain.module.css";
import DashBoardHeading from "../../components/DashBoardHeading";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { getAnalytics } from "../../repository/statsRepo.js";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsMain() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnalytics({
      success: (result) => {
        setData(result.data.data);
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching analytics");
        setLoading(false);
      },
    });
  }, []);

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
            <p className={style.chartTitle}>Top 10 Users by Followers</p>
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
                  <tr key={user.userid} className={style.tr}>
                    <td className={style.td}><span className={style.rank}>{i + 1}</span></td>
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
          </div>

          <div className={style.tableBox}>
            <p className={style.chartTitle}>Top 10 Posts by Likes</p>
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
                  <tr key={post.postid} className={style.tr}>
                    <td className={style.td}><span className={style.rank}>{i + 1}</span></td>
                    <td className={style.td}>
                      <p className={style.caption}>{post.caption || `Post #${post.postid}`}</p>
                    </td>
                    <td className={style.td}><span className={style.userid}>{post.username}</span></td>
                    <td className={style.td}><span className={style.count}>{post.likes}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
