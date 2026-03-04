import style from "./UserPosts.module.css";
import PostCard from "../../components/PostCard";
import NoData from "../../components/NoData";
import Dialog from "../../components/Dialog";
import { useState } from "react";
import PostViewDialog from "../../components/PostViewDialog";
export default function UserPosts({ postsData }) {
  const [currentPostPreview,setCurrentPostPreview]=useState(null);
  return (
    <>
    <Dialog open={currentPostPreview!=null}>
      {
        currentPostPreview!=null&& <PostViewDialog toggle={setCurrentPostPreview} data={currentPostPreview}/>
      }
  
    </Dialog>
      {postsData.length > 0 ? (
        <div className={style.mainContainer}>
          {postsData.map((item) => (
            <PostCard data={item} key={item.postid} setPreviewData={setCurrentPostPreview} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
