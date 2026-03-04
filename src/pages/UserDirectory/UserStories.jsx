import StoryCard from "../../components/StoryCard";
import style from "./UserStories.module.css";
import NoData from "../../components/NoData";

export default function UserStories({ storyData }) {
  return (
    <>
      {storyData.length > 0 ? (
        <div className={style.mainContainer}>
          {storyData.map((item) => (
            <StoryCard data={item} key={item.postid} />
          ))}
        </div>
      ) : (
        <NoData />
      )}
    </>
  );
}
