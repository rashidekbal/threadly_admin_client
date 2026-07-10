import { AlertTriangleIcon, ShieldAlert, X } from "lucide-react";
import React, { useState } from "react";
import { PulseLoader } from "react-spinners";
import { restrictUser } from "../repository/Users.Repo.js";
import { toast } from "react-toastify";

export default function ProfileBlockInterface({
  data,
  toggle,
  onSuccess,
  fetchUserData,
}) {
  const [banDuration, setBanDuration] = useState("permanent");
  const [banReson, setBanReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    if (!banReson.trim())
      return toast.error("please provide a reason for the restriction");

    setLoading(true);
    restrictUser(
      data.uuid,
      {
        banReason: banReson,
        banDuration: banDuration,
        userid: data.userid,
        fcmToken: data.fcmToken || null,
      },
      {
        onSuccess: () => {
          toast.success("account restricted successfully");
          setLoading(false);
          if (onSuccess) onSuccess();
          fetchUserData(data.userid);
          toggle(false);
        },
        onError: (err) => {
          toast.error(err.message || "failed to restrict account");
          setLoading(false);
        },
      },
    );
  };

  return (
    <div className="w-150.5 h-147.5 bg-white rounded-4xl overflow-hidden overflow-y-scroll hide-scroll p-6">
      {/* toolbar */}
      <div className=" flex gap-4">
        <span>
          <ShieldAlert className="bg-red-200 h-10 w-10 p-2 text-red-600 rounded-xl" />
        </span>
        <div>
          <p className="text-xl"> Restrict Account: {data.username} </p>
          <p
            className="text-slate-400 text-[0.9rem] font-serif mt-1"
            style={{
              fontFamily:
                ' "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif ',
            }}
          >
            Restricting an account will limit the user's ability to post,
            comment, and interact with other users. This action will be logged
            in the system audit trail.{" "}
          </p>
        </div>
        <span
          onClick={() => {
            toggle(false);
          }}
        >
          <X className="text-slate-500 cursor-pointer" />
        </span>
      </div>
      {/* block selector */}
      <div className="w-full flex justify-between gap-6 mt-10 mb-4">
        <div
          className={`border-2 ${banDuration == "24" ? "border-red-600 bg-red-50" : "border-slate-400"}  py-2 px-5 rounded-2xl  w-full cursor-pointer`}
          onClick={() => {
            setBanDuration("24");
          }}
        >
          <p
            className={`${banDuration == "24" ? "text-red-500" : "text-black"} text-start`}
          >
            Temporary (24h)
          </p>
          <p
            className="text-gray-400 text-start text-[0.9rem]"
            style={{
              fontFamily:
                ' "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif ',
            }}
          >
            Automated lift after 24 hours
          </p>
        </div>
        <div
          className={`border ${banDuration == "permanent" ? "border-red-600 bg-red-50" : "border-slate-400"} py-2 px-5 rounded-2xl w-full cursor-pointer`}
          onClick={() => {
            setBanDuration("permanent");
          }}
        >
          <p
            className={`${banDuration == "permanent" && "text-red-500"} text-start`}
          >
            permanent
          </p>
          <p
            className="text-slate-400 text-[0.9rem] text-start"
            style={{
              fontFamily:
                ' "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif ',
            }}
          >
            Require manual review to lift
          </p>
        </div>
      </div>
      {/* reason for restriction section */}
      <p
        className="text-slate-400 my-2"
        style={{
          fontFamily:
            ' "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif ',
        }}
      >
        REASON FOR RESTRICTION
      </p>
      <textarea
        value={banReson}
        onChange={(e) => {
          setBanReason(e.target.value);
        }}
        placeholder="e.g. Suspicious activity, community guideline violation"
        className="border border-slate-300 rounded-xl w-full h-40 p-4 outline-0"
        style={{
          fontFamily:
            ' "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif ',
        }}
      />
      <div className="flex gap-4 bg-orange-100 px-4 py-4 rounded-2xl my-5">
        <span>
          <AlertTriangleIcon className="text-orange-400" />
        </span>
        <div>
          <p className="text-orange-600">Important Note</p>
          <p
            style={{
              fontFamily:
                ' "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif ',
            }}
            className="text-orange-500 "
          >
            This user is a{" "}
            {data?.privacy ? data.privacy.toLowerCase() : "public"} account.
            Restricting them will notify their followers and hide their content
            form the global feed during the restriction period.
          </p>
        </div>
      </div>
      {/* save section */}
      <div className="flex justify-between gap-4">
        <button
          className="w-full text-slate-500 bg-slate-100 hover:bg-slate-200 cursor-pointer py-3 rounded-2xl transition-colors font-semibold"
          onClick={() => {
            toggle(false);
          }}
        >
          Cancel
        </button>
        <button
          className={`w-full text-white font-semibold flex justify-center items-center ${banReson ? "bg-red-600 hover:bg-red-700 cursor-pointer" : "bg-red-400"} py-3 rounded-2xl transition-colors`}
          disabled={loading || !banReson}
          onClick={handleConfirm}
        >
          {loading ? (
            <PulseLoader size={8} color="white" />
          ) : (
            "Confirm Restriction"
          )}
        </button>
      </div>
    </div>
  );
}
