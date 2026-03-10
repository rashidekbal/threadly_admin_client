import React, { useEffect, useState } from "react";
import {
  formateTimeFromDateString,
  formateToNormalDateTime,
} from "../utils/dateUtil.js";
import { parseComments } from "../utils/Parser.js";
import { Heart } from "lucide-react";

export default function CommentCard({ data }) {
  const [comment, setComment] = useState([]);
 

  useEffect(() => {
    setComment(parseComments(data.comment));
  }, []);

  return (
    // main container
    <div className=" my-1 p-2 flex">
        {/* profile section  left side*/}
      <div className="w-10">
        <img
          src={data.profile}
          alt="profile data"
          className="h-7 w-7 object-cover rounded-[50%]"
        />
      </div>
      {/* data section right side */}
      <div className=" w-full">
        {/* header ribbon */}
        <div className="flex justify-between px-4 pt-1">
          <p className="text-sm">{data.username}</p>
          <p className="text-[0.6rem] text-slate-400">
            {formateToNormalDateTime(data.createdAt)}{" "}
            <span className="ml-0.5">
              {formateTimeFromDateString(data.createdAt)}
            </span>
          </p>
        </div>
        {/* comment content section */}
        <div className="px-4">
          <p className="text-sm text-slate-600 w-full">
            {comment.length > 0 &&
              comment.map((item) =>
                item.tag ? (
                  <span className="text-blue-600 mr-1.5 cursor-pointer text-[0.8rem]">
                    {item.value}
                  </span>
                ) : (
                  <span className=" mr-1.5 text-[0.8rem]">{item.value}</span>
                ),
              )}
          </p>
        </div>
        {/* control btns  */}
        <div className="flex gap-10 mt-2 items-center px-4">
            <div className="flex items-center gap-1 text-red-500 "><Heart fill="red" className="h-3 w-4"/> <span className="text-black text-[0.7rem]">{data.likesCount}</span></div>

            <div><p className="text-[0.7rem] text-red-600 cursor-pointer">Moderate</p></div>
        </div>
      </div>
    </div>
  );
}
