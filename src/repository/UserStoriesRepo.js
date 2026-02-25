import { userStory } from "../routes/Routes.js";
import api from "./GeneralNetworkingModule.js";
const getUserAllStories=async(userid,cb)=>{
    try {
        let result=await api.get(userStory+userid);
      return  cb.success(result);
    } catch (error) {
       return cb.error(error);
    }

}
export {getUserAllStories}