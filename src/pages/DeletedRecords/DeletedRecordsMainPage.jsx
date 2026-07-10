import React, { useEffect, useState } from 'react';
import style from "../UserDirectory/UserDirectoryMainPage.module.css";
import DashBoardHeading from '../../components/DashBoardHeading';
import { Search, ExternalLink, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { getDeletedUsers, unDeleteUser } from '../../repository/Users.Repo';
import ConfirmDialog from '../../components/ConfirmDialog';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';

export default function DeletedRecordsMainPage() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState(null);

  function openUserInfo(userid) {
    window.navigation.navigate("/userdirectory/" + userid);
  }

  function fetchDeletedUsers(pageNum = page) {
    setLoading(true);
    getDeletedUsers(pageNum, {
      success: (data) => {
        const results = data?.data?.data || [];
        setDeletedUsers(results);
        setHasMore(results.length === 20);
        setLoading(false);
      },
      error: (err) => {
        toast.error("Failed to load deleted records");
        setLoading(false);
      }
    });
  }

  function handleUndelete(userid) {
    setConfirmDialog({
      message: `Are you sure you want to restore user ${userid}?`,
      danger: false,
      onConfirm: () => {
        setConfirmDialog(null);
        unDeleteUser(userid, {
          onSuccess: () => {
            toast.success("User restored successfully");
            fetchDeletedUsers(page);
          },
          onError: () => toast.error("Failed to restore user")
        });
      }
    });
  }

  useEffect(() => {
    fetchDeletedUsers(page);
  }, [page]);

  return (
    <div className='w-full overflow-hidden h-full pr-[14px] bg-[#f8f9fa]'>
      <ConfirmDialog
        open={confirmDialog !== null}
        message={confirmDialog?.message}
        danger={confirmDialog?.danger}
        onConfirm={confirmDialog?.onConfirm}
        onCancel={() => setConfirmDialog(null)}
      />
      <div className="pt-[14px]">
        <DashBoardHeading 
          title="Deleted Records" 
          sub="View deleted users and their associated posts" 
        />
      </div>

      <div className="w-full mt-4 flex items-center justify-between pb-3 bg-white p-4 rounded-xl border-slate-100 border">
        <div className="flex bg-[#f3f4f6] px-4 py-2 border-slate-300 border rounded-lg gap-2">
          <Search size={22} className='text-slate-400' />
          <input type="text" className='outline-none bg-transparent' placeholder='Search deleted records' />
        </div>
      </div>

      <div className="w-[100%] max-h-[100%] overflow-auto mt-4 pb-20 hide-scroll">
        <div className="w-max sm:w-full sm:min-w-[900px] pb-32">
          <div className="bg-white px-2 py-4 border-slate-100 border w-full flex items-center justify-between rounded-t-xl pr-6 font-semibold text-[13px] text-slate-500">
            <span className='w-[10px] sm:w-[25%] px-5'>User</span>
            <span className='w-[10px] sm:w-[15%]'>Privacy</span>
            <span className='w-[10px] sm:w-[15%]'>Followers</span>
            <span className='w-[10px] sm:w-[15%]'>Posts (Deleted)</span>
            <span className='w-[10px] sm:w-[15%]'>Status</span>
            <span className='w-[10px] sm:w-[15%]'>Join Date</span>
            <span className='w-[10px] sm:w-[5%]'>Actions</span>
          </div>

          <div className="w-full bg-white mt-1 border-slate-100 border rounded-b-xl border-t-0 p-3 pt-5">
            {loading ? (
              <div className="w-full flex items-center justify-center p-10"><HashLoader color='#6366f1'/></div>
            ) : !deletedUsers || deletedUsers.length === 0 ? (
              <div className="w-full flex items-center justify-center p-10 text-slate-500">No deleted users found</div>
            ) : (
              <table className='w-full'>
                {deletedUsers.map((item, index) => (
                  <tr key={index} className='cursor-default bg-red-50/30'>
                    <td>
                      <div className={style.specialDataBox}>
                        <div className={style.section}>
                          <img src={item.profile ? item.profile : "./assets/noDp.png"} alt="profile pic" className='rounded-[50%] w-10 h-10 object-cover'/>
                        </div>
                        <div className={style.section}>
                          <p className={style.text}> {item.username}</p>
                          <p className={style.lightText}>{item.userid}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className={style.dataBox}><span className={`${item.privacy === "public" ? style.positiveText : style.warningText} ${style.text}`}> {item.privacy}</span></div>
                    </td>
                    <td>
                      <div className={style.dataBox}><span className={style.text}>{item.followers}</span></div>
                    </td>
                    <td>
                      <div className={style.dataBox}><span className={style.text}>{item.posts}</span></div>
                    </td>
                    <td>
                      <div className={`${style.dataBox} ${style.coloredRoundContainer} text-red-500 ${style.text}`}>deleted</div>
                    </td>
                    <td>
                      <div className={`${style.dataBox} ${style.lightText}`}>{item.joinDate}</div>
                    </td>
                    <td>
                      <div className={`${style.dataBox} flex justify-center gap-3`}>
                        <RotateCcw 
                          className="text-indigo-400 hover:text-indigo-600 cursor-pointer w-4 h-4 transition-colors" 
                          onClick={(e) => { e.stopPropagation(); handleUndelete(item.userid); }} 
                          title="Restore User"
                        />
                        <ExternalLink 
                          className="text-slate-400 hover:text-slate-600 cursor-pointer w-4 h-4 transition-colors" 
                          onClick={(e) => { e.stopPropagation(); openUserInfo(item.userid); }} 
                          title="View Details"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </table>
            )}
          </div>
          
          {!loading && deletedUsers.length > 0 && (
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
    </div>
  );
}
