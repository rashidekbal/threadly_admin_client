import axios from "axios";
import serverUrl from "../routes/GeneralRoute";
const api=axios.create({
    baseURL:serverUrl,
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${window.sessionStorage.getItem("login_token")}`
    }
});
export default api;