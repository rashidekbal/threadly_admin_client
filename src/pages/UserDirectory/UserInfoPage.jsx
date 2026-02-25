import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "./UserInfoPage.module.css";
import {
  ArrowLeft,
  Edit3,
} from "lucide-react";
import UserInfoTile from "../../components/UserInfoTile";
import Dialog from "../../components/Dialog";
import UserInfoEditor from "../../components/UserInfoEditor";
import ProfileBlockInterface from "../../components/ProfileBlockInterface";
import { getUser } from "../../repository/Users.Repo.js";
import { toast } from "react-toastify";
import { getUserAllPosts } from "../../repository/UserPostsRepo.js";
import {getUserAllStories} from "../../repository/UserStoriesRepo.js"

export default function UserInfoPage() {
  function handleBackbtn(){
    window.navigation.back();
  }
  const { userid } = useParams();
  const [isProfileEditorOpen,setIsProfileEditorOpen]=useState(false);
  const [isBlockDialogOpen,setIsBlockDialogOpen]=useState(false);
  const [userData,setUserData]=useState(null);
  const [postsData,setPostsData]=useState([]);
  const [storyData,setStoryData]=useState([]);
  useEffect(()=>{
    getUser(userid,{
      success:(result)=>{
       setUserData(result.data.data[0]);
      },
      error:(err)=>{
        toast.error("error fetching user details")
      }
    });
    getUserAllPosts(userid,{
        success:(result)=>{
           setPostsData(result.data.data)
        },
        error:(error)=>{
            console.log(error)
            toast.error("error fetching user posts");
        }
    });
    getUserAllStories(userid,{
    success:(result)=>{
       setStoryData(result.data.data)
    },
    error:(error)=>{
        console.log(error)
        toast.error("error fetching user posts");
    }
})

  },[userid])


    const handleProfileEditorOpen=()=>{
    setIsProfileEditorOpen(true);
  }
  const openProfileBlockDialog=()=>{
    setIsBlockDialogOpen(true);

  }
  return (

    <>
    {/* profile editor dialog */}
    <Dialog open={isProfileEditorOpen}>
      {userData!=null &&<UserInfoEditor data={userData} toggle={setIsProfileEditorOpen}/>}
    </Dialog>
    <Dialog open={isBlockDialogOpen}>
     {userData!=null && <ProfileBlockInterface data={userData} toggle={setIsBlockDialogOpen}/>}
    </Dialog>
     <div className={style.mainContainer}>
      <div className={style.viewContainer}>
        {/* tool bar  */}
        <div className={style.toolBar}>
          <div className={style.section}>
            <div className={style.backBtn} onClick={handleBackbtn}>
              <span>
                <ArrowLeft className={style.icon} />
              </span>
              <span>Back to Directory</span>
            </div>
          </div>
          <div className={style.section}>
            <div className={style.btn} onClick={()=>{
              handleProfileEditorOpen()
            }}>
              <span>
                <Edit3 className={style.icon} />
              </span>
              <span className={style.btnText}>Edit Profile</span>
            </div>
            <div className={style.btn}
            onClick={()=>{
              openProfileBlockDialog();
            }}>
              <span className={style.btnText}>Restrict Account</span>
            </div>
          </div>
        </div>
      {userData!=null&& <UserInfoTile data={userData} postsData={postsData} storyData={storyData}/>}
      </div>
    </div></>
   
  );
}
