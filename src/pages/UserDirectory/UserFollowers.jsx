import React, { useEffect, useState } from "react";
import style from "./UserDirectoryMainPage.module.css";
import { getUserFollowers } from "../../repository/Users.Repo.js";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import NoData from "../../components/NoData";

export default function UserFollowers() {
  const { userid } = useParams();
  const navigate = useNavigate();
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchFollowers(page);
  }, [page, userid]);

  function fetchFollowers(pageNum) {
    setLoading(true);
    getUserFollowers(userid, pageNum, {
      onSuccess: (res) => {
        const results = res?.data?.data || [];
        setFollowers(results);
        setHasMore(results.length === 20);
        setLoading(false);
      },
      onError: () => {
        toast.error("Failed to load followers");
        setLoading(false);
      },
    });
  }

  if (loading && followers.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <HashLoader color="#4F39F6" />
      </div>
    );
  }

  if (!loading && followers.length === 0) {
    return <NoData message="No followers found" />;
  }

  return (
    <div className="w-full mt-4">
      <div className={style.userTableContainer}>
        <table className={style.userTable}>
          <thead>
            <tr>
              <th>
                <div className={style.specialHeadBox}><span className={style.dataHeading}>USER</span></div>
              </th>
              <th>
                <span className={style.dataHeading}>FOLLOW DATE</span>
              </th>
              <th>
                <span className={style.dataHeading}>ACTIONS</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {followers.map((user) => (
              <tr key={user.userid} className="cursor-pointer hover:bg-slate-50 transition-colors" onClick={() => navigate(`/userdirectory/${user.userid}`)}>
                <td>
                  <div className={style.specialDataBox}>
                    <div className={style.section}>
                      <img src={user.profile || ".././assets/noDp.png"} alt="profile" className="rounded-[50%] w-10 h-10 object-cover" />
                    </div>
                    <div className={style.section}>
                      <p className={style.text}>{user.username}</p>
                      <p className={style.lightText}>{user.userid}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={`${style.dataBox} text-sm text-slate-500`}>
                    {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </td>
                <td>
                  <div className={`${style.dataBox} flex justify-center`}>
                    <ExternalLink 
                      className="text-slate-400 hover:text-indigo-600 cursor-pointer w-5 h-5 transition-colors" 
                      onClick={(e) => { e.stopPropagation(); navigate(`/userdirectory/${user.userid}`); }} 
                      title="View Details"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {(!loading || followers.length > 0) && (
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
