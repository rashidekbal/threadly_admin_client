import style from "./UserPosts.module.css";
import PostCard from "../../components/PostCard";
import NoData from "../../components/NoData";
export default function UserPosts({ postsData }) {
  return (
    <>
      {postsData.length > 0 ? (
        <div className={style.mainContainer}>
          {postsData.map((item) => (
            <PostCard data={item} key={item.postid} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
