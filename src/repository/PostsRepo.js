import api from "./GeneralNetworkingModule.js";
import { allPostsRoute, deletePostRoute } from "../routes/Routes.js";

const getAllPosts = async (sort = "", page = 1, cb) => {
  try {
    const url = sort 
      ? `${allPostsRoute}?sort=${encodeURIComponent(sort)}&page=${page}` 
      : `${allPostsRoute}?page=${page}`;
    const result = await api.get(url);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};

const deletePost = async (postid, cb) => {
  try {
    const result = await api.delete(deletePostRoute + postid);
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

const getSinglePost = async (postid, cb) => {
  try {
    const result = await api.get(allPostsRoute + "single/" + postid);
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

export { getAllPosts, deletePost, getSinglePost };
