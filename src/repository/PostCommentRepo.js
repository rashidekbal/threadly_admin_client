import { postCommentsRoute, deleteCommentRoute } from "../routes/Routes.js";
import api from "./GeneralNetworkingModule.js";

const getPostComments = async (postid, cb) => {
  try {
    let result = await api.get(postCommentsRoute + postid);
    return cb.onSuccess(result);
  } catch (error) {
    return cb.onError(error);
  }
};

const deleteComment = async (commentid, cb) => {
  try {
    const result = await api.delete(deleteCommentRoute + commentid);
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

export { getPostComments, deleteComment };