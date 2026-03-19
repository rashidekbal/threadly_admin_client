import React, { useState, useEffect } from "react";
import style from "./styles/UserInfoEditor.module.css";
import {
  X,
  Save,
  User as UserIcon,
  Mail,
  Lock,
  ShieldAlert,
  Fingerprint,
  RefreshCw,
  Camera,
  Check,
  AtSign,
  Ban,
  AlertTriangle,
} from "lucide-react";
import {
  overrideUserPassword,
  removeProfilePic,
  updateUserInfo,
  updateProfilePic,
  restrictUser,
  unRestrictUser,
} from "../repository/Users.Repo.js";
import { useRef } from "react";
import { CircleLoader, FadeLoader, PulseLoader } from "react-spinners";
import Dialog from "./Dialog.jsx";
import ProfileBlockInterface from "./ProfileBlockInterface.jsx";
import noDp from "../assets/noDp.png";
import { toast } from "react-toastify";

export default function UserInfoEditor({ data, toggle, fetchUserData }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [overrideBtnActive, setOverrideBtnActive] = useState(false);
  const [updatingPass, setUpdatingPass] = useState(false);
  const [updatingPorfilePic, setUpdatingProfilePic] = useState(false);
  const [isReadyToUpdateUserInfo, setisReadyToUpdateUserData] = useState(false);
  const [updatingUserInfo, setUpdatingUserInfo] = useState(false);
  const [userid, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmDeleteDp, setConfirmDeleteDp] = useState(false);
  const [changeDpDialogOpen, setChangeDpDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [restrictDialogOpen, setRestrictDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handlePasswordOverride = async () => {
    if (password != confirmPassword) {
      alert("password and confirm password dosen't matched");
      return;
    }
    setUpdatingPass(true);
    overrideUserPassword(data.uuid, password, {
      onSuccess: () => {
        alert("password updated successfully");
        setUpdatingPass(false);
        setPassword("");
        setConfirmPassword("");
      },
      onError: (err) => {
        setUpdatingPass(false);
        alert(err.message);
      },
    });
  };
  useEffect(() => {
    if (password.length >= 6) {
      setOverrideBtnActive(true);
      return;
    }
    setOverrideBtnActive(false);
  }, [password]);
  useEffect(() => {
    setUserId(data.userid);
    setUsername(data.username);
    setEmail(data.email);
  }, [data]);

  const handleProfilePicRemove = async () => {
    setConfirmDeleteDp(false);
    setUpdatingProfilePic(true);
    removeProfilePic(data.uuid, {
      onSuccess: (result) => {
        alert("success");
        fetchUserData(data.userid);
        setUpdatingProfilePic(false);
      },
      onError: (err) => {
        alert(err);
        setUpdatingProfilePic(false);
      },
    });
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChangeDpSubmit = async () => {
    if (!selectedFile) return;
    setChangeDpDialogOpen(false);
    setUpdatingProfilePic(true);
    updateProfilePic(data.uuid, selectedFile, {
      onSuccess: (result) => {
        alert("profile picture updated successfully");
        fetchUserData(data.userid);
        setUpdatingProfilePic(false);
        setSelectedFile(null);
        setPreviewUrl(null);
      },
      onError: (err) => {
        alert(err.message || err);
        setUpdatingProfilePic(false);
      },
    });
  };

  const handleUnrestrictAccount = () => {
    if (window.confirm("Are you sure you want to unrestrict this user?")) {
      unRestrictUser(data.uuid, {
        onSuccess: () => {
          toast.success("Account unrestricted successfully!");
          fetchUserData(data.userid);
        },
        onError: (err) => {
          toast.error(err.message || "Failed to unrestrict account");
        },
      });
    }
  };

  function handleUserinfoChanges() {
    setisReadyToUpdateUserData(true);
  }
  async function handleSaveChanges() {
    if (!isReadyToUpdateUserInfo) return;
    setUpdatingUserInfo(true);
    updateUserInfo(
      { uuid: data.uuid, userid, username, email },
      {
        onSuccess: (result) => {
          setUpdatingUserInfo(false);
          setisReadyToUpdateUserData(false);
          fetchUserData(data.userid);
          alert("success");
        },
        onError: (err) => {
          alert(err);
          setisReadyToUpdateUserData(true);
          setUpdatingUserInfo(false);
        },
      },
    );
  }
  return (
    <div className={`${style.mainContainer} hide-scroll`}>
      <div className={style.topStrip}>
        <div className={style.section}>
          <span>
            <ShieldAlert className={style.ShieldAlert} />
          </span>
        </div>
        <div className={style.section}>
          <p className={style.heading}>Manage User Identity</p>
          <p className={style.subheading}>
            Overriding system constraints for {data.userid}
          </p>
        </div>
        <div className={style.section}>
          <span
            onClick={() => {
              toggle(false);
            }}
          >
            <X className={`${style.icon} cursor-pointer`} />
          </span>
        </div>
      </div>

      <div className={`${style.profileSection} gap-3.75`}>
        <section className={style.profileImageHolder}>
          <img
            className={style.profileImg}
            src={data.profile ? data.profile : noDp}
          />
        </section>
        <section>
          <p className={style.heading3}>Profile Media</p>
          <p className={style.subheading}>
            Change the user's public profile pic
          </p>
          <div>
            {updatingPorfilePic ? (
              <div className="">
                <PulseLoader size={6} color="#4F39F6" />
              </div>
            ) : (
              <>
                <button
                  className={style.btn}
                  onClick={() => setChangeDpDialogOpen(true)}
                >
                  Upload new
                </button>
                <button
                  className={style.btn}
                  onClick={() => {
                    if (!data.profile) return alert("no profile pic to delete");
                    setConfirmDeleteDp(true);
                  }}
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </section>
      </div>
      {/* user basic details input section */}
      <div className=" w-full ">
        <div className=" w-full mt-12 flex gap-10 justify-between ">
          <div className=" w-full">
            <p className="text-slate-400 text-m">UNIQUE USER ID</p>
            <div
              className="flex  justify-between border border-slate-300 my-1
            py-2 px-4 rounded-xl align-middle
            "
            >
              <span>
                <Fingerprint className="h-5 text-slate-400" />
              </span>
              <input
                type="text"
                disabled
                value={data.uuid}
                className="text-slate-500 text-sm"
              />
              <span className="text-slate-400 text-sm">READONLY</span>
            </div>
          </div>
          <div className=" w-full">
            <p className="text-slate-400">SYSTEM USERID</p>
            <div
              className="flex  justify-between border border-slate-300 my-1
              py-2 px-4  rounded-xl
            "
            >
              <span>
                <AtSign className="h-5 text-slate-400" />
              </span>
              <input
                type="text"
                value={userid}
                onChange={(e) => {
                  setUserId(e.target.value);
                  handleUserinfoChanges();
                }}
                className="text-slate-500 text-sm w-full ml-2"
              />
            </div>
          </div>
        </div>
        <div className=" w-full">
          <div className=" w-full mt-8 flex gap-10 justify-between ">
            <div className=" w-full">
              <p className="text-slate-400 text-m">FULL DISPLAY NAME</p>
              <div
                className="flex  justify-between border border-slate-300 my-1
            py-2 px-4  rounded-xl align-middle
            "
              >
                <span>
                  <UserIcon className="h-5 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="full name"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    handleUserinfoChanges();
                  }}
                  className="text-slate-500 text-sm w-full ml-2"
                />
              </div>
            </div>
            <div className=" w-full">
              <p className="text-slate-400">VERIFIED EMAIL</p>
              <div
                className="flex  justify-between border border-slate-300 my-1
             py-2 px-4  rounded-xl
            "
              >
                <span>
                  <Mail className="h-5 text-slate-400" />
                </span>
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleUserinfoChanges();
                  }}
                  className="text-slate-500 text-sm w-full ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* password section */}
      <div className="my-10 mx-10">
        <div className="flex  gap-2 text-[1.2rem] ">
          <span>
            <Lock className="text-indigo-600 w-4 h-7" />
          </span>{" "}
          Security Override
        </div>

        <p className={style.subheading2}>
          Forced password update (User will be notified of change)
        </p>
        {/* password input  */}
        <div className=" w-full">
          <div className=" w-full mt-8 flex gap-10 justify-between ">
            <div className=" w-full">
              <div
                className=" border border-slate-300 my-1
            py-2 px-4  rounded-xl align-middle
            "
              >
                <input
                  type="text"
                  placeholder="New Secure Password"
                  className="text-slate-500 text-sm w-full ml-2"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className=" w-full">
              <div
                className=" border border-slate-300 my-1
             py-2 px-4  rounded-xl
            "
              >
                <input
                  type="text"
                  placeholder="Confirm New Password"
                  className="text-slate-500 text-sm w-full ml-2"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* password override btn */}
        {updatingPass ? (
          <div
            className={`flex gap-2 text-sm ${overrideBtnActive ? "bg-gray-800" : "bg-gray-500"} py-2 justify-center rounded-2xl my-4 cursor-pointer`}
          >
            <PulseLoader color={"white"} size={12} />
          </div>
        ) : (
          <div
            className={`flex gap-2 text-sm ${overrideBtnActive ? "bg-gray-800" : "bg-gray-500"} py-2 justify-center rounded-2xl my-4 cursor-pointer`}
            onClick={() => {
              if (overrideBtnActive) handlePasswordOverride();
            }}
          >
            <span>
              <RefreshCw className="h-5 text-white" />
            </span>
            <p className="text-white">OVERRIDE & RE-ENCRYPT PASSWORD</p>
          </div>
        )}

        {/* account restriction section */}
        {data?.status === "banned" ? (
          <div className="mt-12">
            <div className="flex gap-2 text-[1.2rem] ">
              <span>
                <Check className="text-green-500 w-4 h-7" />
              </span>
              <span className="text-green-500 font-semibold">
                Unrestrict Account
              </span>
            </div>
            <p className={style.subheading2}>
              Restore this user's ability to post and interact.
            </p>
            <div
              className="flex items-center gap-2 text-sm bg-green-100 text-green-700 hover:bg-green-200 py-3 mt-4 justify-center rounded-2xl cursor-pointer transition-colors font-semibold shadow-sm"
              onClick={handleUnrestrictAccount}
            >
              <Check className="h-5 text-green-600" />
              <p>UNRESTRICT USER ACCOUNT</p>
            </div>
          </div>
        ) : (
          <div className="mt-12">
            <div className="flex gap-2 text-[1.2rem] ">
              <span>
                <Ban className="text-red-500 w-4 h-7" />
              </span>
              <span className="text-red-500 font-semibold">
                Restrict Account
              </span>
            </div>
            <p className={style.subheading2}>
              Temporarily restrict this user's ability to post or interact.
            </p>
            <div
              className="flex items-center gap-2 text-sm bg-red-100 text-red-700 hover:bg-red-200 py-3 mt-4 justify-center rounded-2xl cursor-pointer transition-colors font-semibold shadow-sm"
              onClick={() => setRestrictDialogOpen(true)}
            >
              <AlertTriangle className="h-5 text-red-600" />
              <p>RESTRICT USER ACCOUNT</p>
            </div>
          </div>
        )}

        {/* general save btn */}
        <div className="w-full flex justify-between gap-45 pt-10">
          <div
            className={`flex text-white ${isReadyToUpdateUserInfo ? "bg-violet-700" : "bg-violet-500"} w-full py-3.5 justify-center gap-4 rounded-3xl cursor-pointer `}
            onClick={handleSaveChanges}
          >
            {updatingUserInfo ? (
              <PulseLoader size={10} color="white" />
            ) : (
              <>
                {" "}
                <Save />
                <p>SAVE PROFILE CHANGES</p>
              </>
            )}
          </div>
          <button
            className="text-slate-500 cursor-pointer"
            onClick={() => {
              toggle(!toggle);
            }}
          >
            CANCEL
          </button>
        </div>
      </div>

      <Dialog open={confirmDeleteDp}>
        <div className="bg-white w-auto h-auto rounded-2xl p-6">
          <p className="text-start text-xl text-slate-500">
            Do you really want to remove the profile picture?
          </p>
          <div className="mt-8 flex gap-4">
            <button
              className="border border-slate-400 px-5 py-2 rounded-2xl cursor-pointer w-full bg-red-500 text-white"
              onClick={handleProfilePicRemove}
            >
              Yes, Remove
            </button>
            <button
              className="border border-slate-400 px-5 py-2 rounded-2xl cursor-pointer w-full bg-slate-200 text-slate-700"
              onClick={() => setConfirmDeleteDp(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>

      <Dialog open={changeDpDialogOpen}>
        <div className="bg-white w-[400px] max-w-[90vw] h-auto rounded-2xl p-6">
          <p className="text-start text-xl text-slate-500 mb-6">
            Upload New Profile Picture
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleFileSelect}
            />

            <div
              className="w-32 h-32 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer hover:border-violet-500 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-slate-400">
                  <Camera size={32} />
                  <span className="text-xs mt-2">Select Image</span>
                </div>
              )}
            </div>

            {selectedFile && (
              <p className="text-sm text-slate-500 max-w-full truncate">
                {selectedFile.name}
              </p>
            )}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              className={`border border-slate-400 px-5 py-2 rounded-2xl cursor-pointer w-full text-white ${selectedFile ? "bg-violet-600" : "bg-violet-300"}`}
              disabled={!selectedFile}
              onClick={handleChangeDpSubmit}
            >
              Save
            </button>
            <button
              className="border border-slate-400 px-5 py-2 rounded-2xl cursor-pointer w-full bg-slate-200 text-slate-700"
              onClick={() => {
                setChangeDpDialogOpen(false);
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>

      {/* Restrict Account Dialog */}
      <Dialog open={restrictDialogOpen}>
        {restrictDialogOpen && (
          <ProfileBlockInterface
            data={data}
            toggle={setRestrictDialogOpen}
            onSuccess={() => fetchUserData(data.userid)}
          />
        )}
      </Dialog>
    </div>
  );
}
