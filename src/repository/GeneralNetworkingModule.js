import axios from "axios";
import {serverUrl} from "../routes/Routes";
import { getSecretTokenLocalStorage } from "../utils/localStorageUtil.js";
import { getSecretToken } from "../utils/SessionStorageUtil.js";
const api=axios.create({
    baseURL:serverUrl,
    headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${getSecretToken()!=null?getSecretToken():getSecretTokenLocalStorage()}`
    }
});
export default api;