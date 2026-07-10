import { userPosts } from "../routes/Routes.js";
import api from "./GeneralNetworkingModule.js";
const getUserAllPosts = async (userid, page = 1, cb) => {
    try {
        let result = await api.get(`${userPosts}${userid}?page=${page}`);
      return  cb.success(result);
    } catch (error) {
       return cb.error(error);
    }

}
export {getUserAllPosts}