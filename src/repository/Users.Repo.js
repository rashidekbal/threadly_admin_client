import api from "./GeneralNetworkingModule.js";
import {overridePasswordRoute, usersRoute} from "../routes/Routes.js";

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
const overrideUserPassword=async(uuid,newPassword,cb)=>{
    const passwordOverrideRoute=overridePasswordRoute;
    try {
        const result =await api.patch(passwordOverrideRoute, {newPassword,uuid})
        cb.onSuccess(result);
    }catch (err){
        cb.onError(err);
    }
}
export {getAllUsers,getUser,overrideUserPassword}