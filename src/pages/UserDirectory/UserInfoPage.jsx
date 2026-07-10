import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import style from "./UserInfoPage.module.css";
import { ArrowLeft, Edit3 } from "lucide-react";
import UserInfoTile from "../../components/UserInfoTile";
import Dialog from "../../components/Dialog";
import UserInfoEditor from "../../components/UserInfoEditor";
import ProfileBlockInterface from "../../components/ProfileBlockInterface";
import { getUser } from "../../repository/Users.Repo.js";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function UserInfoPage() {
  function handleBackbtn() {
    window.navigation.back();
  }
  const { userid } = useParams();
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [postsData, setPostsData] = useState([]);
  const [storyData, setStoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUserData(userid);
  }, [userid]);

  const handleProfileEditorOpen = () => {
    setIsProfileEditorOpen(true);
  };
  const openProfileBlockDialog = () => {
    setIsBlockDialogOpen(true);
  };
  function fetchUserData(userid) {
    getUser(userid, {
      success: (result) => {
        setUserData(result.data.data[0]);
        setLoading(false);
      },
      error: (err) => {
        toast.error("error fetching user details");
        setLoading(false);
      },
    });
  }
  return (
    <>
      {/* profile editor dialog */}
      <Dialog open={isProfileEditorOpen}>
        {userData != null && (
          <UserInfoEditor
            data={userData}
            toggle={setIsProfileEditorOpen}
            fetchUserData={fetchUserData}
          />
        )}
      </Dialog>

      <Dialog open={isBlockDialogOpen}>
        {userData != null && (
          <ProfileBlockInterface
            data={userData}
            toggle={setIsBlockDialogOpen}
            fetchUserData={fetchUserData}
          />
        )}
      </Dialog>

      <div className={style.mainContainer}>
        {loading ? (
          <div className=" flex justify-center h-100 mt-50">
            <HashLoader color="#4F39F6" />
          </div>
        ) : (
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
                <div
                  className={style.btn}
                  onClick={() => {
                    handleProfileEditorOpen();
                  }}
                >
                  <span>
                    <Edit3 className={style.icon} />
                  </span>
                  <span className={style.btnText}>Edit Profile</span>
                </div>
                {userData?.status != "banned" && (
                  <div
                    className={style.btn}
                    onClick={() => {
                      openProfileBlockDialog();
                    }}
                  >
                    <span className={style.btnText}>Restrict Account</span>
                  </div>
                )}
              </div>
            </div>
            {userData != null && (
              <UserInfoTile
                data={userData}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
