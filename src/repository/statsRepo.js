import { dashboardStatsRoute } from "../routes/Routes.js";
import api from "./GeneralNetworkingModule.js";

async function getDashBoardStats(cb){
    try {
        
    let result=await api.get(dashboardStatsRoute)
    return cb.onSuccess(result)
        
    } catch (error) {
        return cb.onError(error);
        
    }
}
export {
    getDashBoardStats
}