import { postCommentsRoute } from "../routes/Routes.js";
import api from "./GeneralNetworkingModule.js";
const getPostComments=async(postid,cb)=>{
    try {
        let result=await api.get(postCommentsRoute+postid);
      return  cb.onSuccess(result);
    } catch (error) {
       return cb.onError(error);
    }

}
export {getPostComments}