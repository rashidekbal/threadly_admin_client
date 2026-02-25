import axios from "axios";
import {serverUrl} from "../routes/Routes";
const api=axios.create({
    baseURL:serverUrl,
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${window.sessionStorage.getItem("token")}`
    }
});
export default api;