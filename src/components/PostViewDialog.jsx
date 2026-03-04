import React, { useEffect, useState } from "react";
import { generatePreviewUrl } from "../utils/Cloudinary.util.js";
import { formateToNormalDateTime,formateTimeFromDateString } from "../utils/dateUtil.js";
import { X } from "lucide-react";
import { getPostComments } from "../repository/PostCommentRepo.js";
export default function PostViewDialog({ data,toggle }) {
    const [comments,setComments]=useState([]);
    function handleClose(){
        toggle(null)

    }
    function handleSuccess(data){
        setComments(data)

    }
    useEffect(()=>{
        getPostComments(data.postid,{
              onError: (error) => {
                toast.error(error);
                
              },
              onSuccess: (result) => {
                handleSuccess(result.data.data);
              },
            })
    },[])
  return (
    <div className="w-290 h-125 rounded-4xl overflow-hidden flex bg-white">
      <div className=" w-[70%]">
        <span
          className="bg-slate-500
        text-white px-4 py-1 rounded-sm absolute top-5 left-5"
        >
          {data.type}
        </span>{" "}
        {data.type == "video" ? (
          <video
            src={data.imageurl}
            poster={generatePreviewUrl(data.imageurl)}
            autoPlay={true}
            controls
            loop={true}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={generatePreviewUrl(data.imageurl)}
            alt="post"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        )}
      </div>
      {/* stats section */}
      <div className="py-6 px-6 w-[50%]">
        {/* ribbon */}
        <div className=" flex gap-4 justify-between">
            <span>
                <img src={data.profile} alt="profile" loading="lazy" className="w-10 h-10 object-cover rounded-[50%]" />
            </span>
            <div className="w-[80%] ">
                <p>{data.userid}</p>
                <p className="text-[0.6rem] text-slate-500">{formateToNormalDateTime(data.created_at)} { formateTimeFromDateString(data.created_at)}</p>

            </div>
            <div >
                <span > 
                    <X className="text-slate-400 bg-slate-300 h-8 w-8 p-2 rounded-[50%] cursor-pointer" onClick={()=>{
                        handleClose();
                    }}/>
                </span>
            </div>
        </div>
        {/* caption area */}
        <div className=" w-full h-10 mt-8">
            <p className="text-slate-400 text-[0.9rem]">{data.caption}</p>
        </div>
        {/* interaction data section */}
        <div className=" w-full  flex gap-10">
            <div className="">
                <div><p className="text-center">{data.likesCount}</p></div>
                <div> <p className="text-slate-400">LIKES</p></div>
            </div>
            <div className="">
                <div><p className="text-center">{data.commentsCount}</p></div>
                <div> <p className="text-slate-400">COMMENTS</p></div>
            </div>
            <div className="">
                <div><p className="text-center">0</p></div>
                <div><p className="text-slate-400">SHARES</p></div>
            </div>
             <div className="">
                <div><p className="text-center ">5k</p></div>
                <div><p className="text-slate-400">VIEWS</p></div>
            </div>
          
        </div>

        {/* comments section */}
        <div className=" w-full h-77 pt-7 overflow-hidden hide-scroll">
            <p className="text-slate-500">COMMENTS AUDIT</p>
        </div>
      </div>
    </div>
  );
}
