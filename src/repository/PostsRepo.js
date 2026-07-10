import api from "./GeneralNetworkingModule.js";
import { allPostsRoute, deletePostRoute } from "../routes/Routes.js";

const getAllPosts = async (cb) => {
  try {
    const result = await api.get(allPostsRoute);
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

export { getAllPosts, deletePost };
