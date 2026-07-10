import { useState, useEffect } from "react";
import StoryCard from "../../components/StoryCard";
import style from "./UserStories.module.css";
import NoData from "../../components/NoData";
import Dialog from "../../components/Dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useParams } from "react-router";
import { getUserAllStories } from "../../repository/UserStoriesRepo.js";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export default function UserStories() {
  const { userid } = useParams();
  const [selectedStory, setSelectedStory] = useState(null);
  const [localStories, setLocalStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUserAllStories(userid, page, {
      success: (result) => {
        const data = result.data.data;
        setLocalStories(data);
        setHasMore(data.length === 15);
        setLoading(false);
      },
      error: () => {
        toast.error("error fetching stories");
        setLoading(false);
      },
    });
  }, [userid, page]);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <HashLoader color="#4F39F6" />
        </div>
      ) : localStories?.length > 0 ? (
        <div className={style.mainContainer}>
          {localStories.map((item) => (
            <StoryCard data={item} key={item.postid || item.id} onClick={() => setSelectedStory(item)} />
          ))}
        </div>
      ) : (
        <NoData />
      )}

      {!loading && localStories.length > 0 && (
        <div className="flex justify-between items-center mt-6 py-4 border-t border-slate-100">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center px-4 py-2 border rounded-md text-sm text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" /> Previous
          </button>
          <span className="text-sm text-slate-500 font-medium">Page {page}</span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasMore}
            className="flex items-center px-4 py-2 border rounded-md text-sm text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            Next <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
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
