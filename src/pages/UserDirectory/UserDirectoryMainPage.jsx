import React from 'react'
import style from "./UserDirectoryMainPage.module.css"
import DashBoardHeading from '../../components/DashBoardHeading';
import { Filter, MoreHorizontal, MoreHorizontalIcon, Search } from 'lucide-react';
export default function UserDirectoryMainPage() {
  function openUserInfo(userid){
    window.navigation.navigate("/userdirectory/"+userid)
  }
      const userData = [
    {
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCSDmaQhe5BqKWGs0YvLsRNZIO0YwQls4xOg&s",
      username: "Alex Rivera",
      userid: "@alex_designer",
      privacy: "public",
      followers: 12400,
      posts: 142,
      status: "active",
      joinDate: new Date().toDateString(),
    },
    {
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cSWkAy-XIO1J8p6-nFwZ0e_ToimYc45J9Q&s",
      username: "Martin Rivera",
      userid: "@martin_designer",
      privacy: "private",
      followers: 400,
      posts: 12,
      status: "active",
      joinDate: new Date().toDateString(),
    },   {
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cSWkAy-XIO1J8p6-nFwZ0e_ToimYc45J9Q&s",
      username: "Martin Rivera",
      userid: "@martin_designer",
      privacy: "private",
      followers: 400,
      posts: 12,
      status: "active",
      joinDate: new Date().toDateString(),
    },
       {
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7cSWkAy-XIO1J8p6-nFwZ0e_ToimYc45J9Q&s",
      username: "Martin Rivera",
      userid: "@martin_designer",
      privacy: "private",
      followers: 400,
      posts: 12,
      status: "active",
      joinDate: new Date().toDateString(),
    },
  ];
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
            <table className={style.userTable} >
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
              {userData.map((item) => (
                <tr>
                  <td>
                    <div className={style.specialDataBox}>
                      <div className={style.section}>
                        <img src={item.profile} alt="profile pic"/>
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
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
