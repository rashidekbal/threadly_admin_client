import React, { useContext, useEffect, useState } from 'react'
import style from "./UserDirectoryMainPage.module.css"
import DashBoardHeading from '../../components/DashBoardHeading';
import { Filter, MoreHorizontal, MoreHorizontalIcon, Search } from 'lucide-react';
import { getAllUsers } from '../../repository/Users.Repo';
import { toast } from 'react-toastify';
import { HashLoader } from 'react-spinners';
import { data } from '../../store/Context';
export default function UserDirectoryMainPage() {
  const {users,setUsers}=useContext(data);
  const [loading,setLoading]=useState(true);
  function openUserInfo(userid){
    
    window.navigation.navigate("/userdirectory/"+userid)
  }
  useEffect(()=>{
    if(users.length!=0){
      setLoading(false);
      return;
    }
      getAllUsers({
        success:(result)=>{
          setUsers(result.data.data);
          setLoading(false);

        },
        error:(err)=>{
          console.log(err)
          toast.error("error fetching users "+err.message)
          setLoading(false);
        }
      })
  },[])

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
            <div className={style.section}>
              <div className={style.inputContainerMain}>
                <span>
                  <Search className={style.icon} />
                </span>
                <input
                  type="text"
                  placeholder="search by name, username or email..."
                />
              </div>
            </div>
            {/* filter section */}
            <div className={style.section}>
              <div className={style.filterBox}>
                <Filter className={style.icon} />
                <span>Filter</span>
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
                    <div className={style.dataBox}>
                      <MoreHorizontalIcon className={style.icon} onClick={()=>{openUserInfo(item.userid)}} />
                    </div>
                  </td>
                </tr>
              ))}
            </table>}
          </div>
        </div>
      </div>
    </div>
  )
}
