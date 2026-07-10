import React, { useContext, useEffect, useState } from 'react'
import style from "./UserDirectoryMainPage.module.css"
import DashBoardHeading from '../../components/DashBoardHeading';
import { Filter, MoreHorizontal, MoreHorizontalIcon, Search, UserPlus, Trash2 } from 'lucide-react';
import { getAllUsers, deleteUser } from '../../repository/Users.Repo';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { data } from '../../store/Context';
import CreateUserDialog from '../../components/CreateUserDialog';
import Dialog from '../../components/Dialog';

export default function UserDirectoryMainPage() {
  const {users,setUsers}=useContext(data);
  const [loading,setLoading]=useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [optionsUser, setOptionsUser] = useState(null);

  function openUserInfo(userid){
    window.navigation.navigate("/userdirectory/"+userid)
  }

  const fetchUsers = (pageNumber = page, searchQuery = search, sortQuery = sort) => {
    setLoading(true);
    getAllUsers(pageNumber, searchQuery, sortQuery, {
      success:(result)=>{
        setUsers(result.data.data);
        setLoading(false);
      },
      error:(err)=>{
        console.log(err)
        toast.error("error fetching users "+err.message)
        setLoading(false);
      }
    });
  };

  const handleDeleteUser = (userid) => {
    if (window.confirm("Are you sure you want to delete this user? All their posts will also be deleted.")) {
      deleteUser(userid, {
        onSuccess: (res) => {
          toast.success("User deleted successfully");
          fetchUsers();
        },
        onError: (err) => {
          toast.error("Failed to delete user");
        }
      });
    }
  };

  useEffect(()=>{
    fetchUsers(page, search, sort);
  },[page, sort])

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setPage(1); // reset to page 1
      fetchUsers(1, search, sort);
    }
  };

  const handleNextPage = () => setPage(p => p + 1);
  const handlePrevPage = () => setPage(p => (p > 1 ? p - 1 : 1));

  return (
    <div className={style.mainContainer}>
      <DashBoardHeading
        heading="User Directory"
        subHeading="Access all user profiles, including private accounts"
      />
      <div className={style.viewContainer}>
        {/* recatngular view */}
        <div className={style.subView}>
          {/* toolbar for search and filter */}
          <div className={`${style.toolBar}`}>
            {/* input section */}
            <div className={style.section} style={{ width: '60%' }}>
              <div className={style.inputContainerMain}>
                <span>
                  <Search className={style.icon} />
                </span>
                <input
                  type="text"
                  placeholder="search by username or userid (Press Enter)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </div>
            {/* filter and create sections */}
            <div className={style.section} style={{ width: '40%', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
              <div className={style.filterBox} style={{ width: 'auto', padding: '8px 20px', display: 'flex', alignItems: 'center' }}>
                <Filter className={style.icon} style={{ marginRight: '8px' }} />
                <select 
                  className="bg-transparent outline-none text-slate-600 font-medium text-sm cursor-pointer"
                  value={sort}
                  onChange={(e) => {
                    setSort(e.target.value);
                    setPage(1); // reset to page 1 on sort change
                  }}
                >
                  <option value="">Default Order</option>
                  <option value="most_followers">Most Followers</option>
                  <option value="most_posts">Most Posts</option>
                  <option value="most_comments">Most Comments</option>
                  <option value="most_active">Most Active</option>
                  <option value="recently_joined">Recently Joined</option>
                  <option value="lastly_joined">Lastly Joined</option>
                  <option value="alpha_username">Username (A-Z)</option>
                  <option value="alpha_userid">User ID (A-Z)</option>
                </select>
              </div>
              <div 
                className="flex items-center justify-center gap-2 bg-violet-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-violet-700 transition-colors shrink-0"
                onClick={() => setShowCreateUser(true)}
              >
                <UserPlus size={18} className="text-white" />
                <span className="text-sm font-semibold text-white">Create User</span>
              </div>
            </div>
          </div>

          <div className={style.userTableContainer}>
            {loading?<div className=' flex justify-center items-center h-50'><HashLoader color='#4F39F6'/></div>:<table className={style.userTable} >
              <tr>
                <th>
                  <div  className={style.specialHeadBox}><span className={style.dataHeading}>USER</span></div>
                </th>
                <th>
                  <span className={style.dataHeading}>PRIVACY</span>
                </th>
                <th>
                  <span className={style.dataHeading}>FOLLOWERS</span>
                </th>
                <th>
                  <span className={style.dataHeading}>POSTS</span>
                </th>
                <th>
                  <span className={style.dataHeading}>STATUS</span>
                </th>
                <th>
                  <span className={style.dataHeading}>
                    JOIN
                  
                    DATE
                  </span>
                </th>
                <th className={style.dataHeading}>ACTIONS</th>
              </tr>
              {users.length>0&&users.map((item) => (
                <tr onClick={()=>{openUserInfo(item.userid)}} className='cursor-pointer'>
                  <td>
                    <div className={style.specialDataBox}>
                      <div className={style.section}>
                        <img src={item.profile?item.profile:"./assets/noDp.png"} alt="profile pic" className='rounded-[50%] w-10 h-10 object-cover'/>
                      </div>
                      <div className={style.section}>
                        <p className={style.text}> {item.username}</p>
                        <p className={style.lightText}>{item.userid}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={style.dataBox}><span className={`${item.privacy=="public"?style.positiveText:style.warningText} ${style.text}`}> {item.privacy}</span></div>
                  </td>
                  <td>
                    <div className={style.dataBox}><span className={style.text}>{item.followers}</span></div>
                  </td>
                  <td>
                    <div className={style.dataBox}><span className={style.text}>{item.posts}</span></div>
                  </td>
                  <td>
                    <div className={`${style.dataBox} ${style.coloredRoundContainer} ${item.status=="active"?style.positiveText:style.warningText} ${style.text}`}>{item.status}</div>
                  </td>
                  <td>
                    <div className={`${style.dataBox} ${style.lightText}`}>{item.joinDate}</div>
                  </td>
                  <td>
                    <div className={`${style.dataBox} flex justify-center`}>
                      <MoreHorizontalIcon 
                        className="text-slate-400 hover:text-slate-600 cursor-pointer w-5 h-5 transition-colors" 
                        onClick={(e)=>{ e.stopPropagation(); setOptionsUser(item); }} 
                        title="Options"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </table>}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-4 px-2">
            <span className="text-sm text-slate-500 font-medium">Page {page}</span>
            <div className="flex gap-2">
              <button 
                onClick={handlePrevPage} 
                disabled={page === 1}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button 
                onClick={handleNextPage} 
                disabled={users.length < 20}
                className="px-4 py-2 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <CreateUserDialog 
        open={showCreateUser} 
        onClose={() => setShowCreateUser(false)} 
        onSuccess={() => {
          toast.success("User created successfully!");
          fetchUsers();
        }} 
      />

      <Dialog open={!!optionsUser}>
        {optionsUser && (
          <div className="bg-white p-6 rounded-2xl w-[320px]">
            <h3 className="font-bold text-lg mb-4 text-slate-700 text-center border-b pb-3">User Options</h3>
            <p className="text-center text-sm text-slate-500 mb-4 truncate font-medium">@{optionsUser.userid}</p>
            <div className="flex flex-col gap-2">
              <button 
                className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl transition-colors font-medium text-sm"
                onClick={() => { openUserInfo(optionsUser.userid); setOptionsUser(null); }}
              >
                View Details
              </button>
              <button 
                className="w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors font-medium text-sm"
                onClick={() => { handleDeleteUser(optionsUser.userid); setOptionsUser(null); }}
              >
                Delete User
              </button>
            </div>
            <div className="mt-5 pt-3 border-t flex justify-center">
              <button 
                className="text-sm font-medium text-slate-400 hover:text-slate-600 px-4 py-2" 
                onClick={() => setOptionsUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  )
}
