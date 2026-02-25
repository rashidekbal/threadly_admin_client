import api from "./GeneralNetworkingModule.js";
import { usersRoute } from "../routes/Routes.js";

const getAllUsers=async(cb)=>{
    try {
        const result =await api.get(usersRoute)
        cb.success(result);
    } catch (err) {
        cb.error(err);
        
    }
}
const getUser=async(userid,cb)=>{
    try {
        const result =await api.get(usersRoute+userid)
        cb.success(result);
    } catch (err) {
        cb.error(err);
        
    }
}
export {getAllUsers,getUser}