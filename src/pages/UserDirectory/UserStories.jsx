import { useState } from "react";
import StoryCard from "../../components/StoryCard";
import style from "./UserStories.module.css";
import NoData from "../../components/NoData";
import Dialog from "../../components/Dialog";
import { X } from "lucide-react";

export default function UserStories({ storyData }) {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <>
      {storyData?.length > 0 ? (
        <div className={style.mainContainer}>
          {storyData.map((item) => (
            <StoryCard data={item} key={item.postid} onClick={() => setSelectedStory(item)} />
          ))}
        </div>
      ) : (
        <NoData />
      )}

      <Dialog open={!!selectedStory}>
        {selectedStory && (
          <div className="bg-black/95 w-[500px] max-w-[95vw] h-[85vh] rounded-2xl p-4 relative flex flex-col items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/30 rounded-full p-2 transition-colors z-[100] cursor-pointer"
              onClick={() => setSelectedStory(null)}
            >
              <X size={24} />
            </button>
            <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xl bg-black relative">
              {(selectedStory.type === "video" || selectedStory.storyUrl?.includes('.mp4')) ? (
                <video 
                  src={selectedStory.storyUrl} 
                  autoPlay 
                  controls 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <img 
                  src={selectedStory.storyUrl} 
                  alt="Story" 
                  className="max-w-full max-h-full object-contain"
                />
              )}
            </div>
            {selectedStory.caption && (
              <div className="absolute bottom-6 left-6 right-6 bg-black/60 text-white p-4 rounded-xl backdrop-blur-sm z-50">
                <p className="text-sm font-medium">{selectedStory.caption}</p>
                <div className="flex gap-4 mt-2 text-xs text-white/70">
                  <span>Views: {selectedStory.views || 0}</span>
                  <span>Likes: {selectedStory.likes || 0}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Dialog>
    </>
  );
}
