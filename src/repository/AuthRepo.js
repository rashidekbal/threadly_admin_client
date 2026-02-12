import axios from "axios";
import { loginRoute } from "../routes/AuthRoutes.js";
const LoginHandler=async(credentials,callback)=>{
    if(!credentials)return callback.onError("invalid credential");
    try{
         let result=await axios.post(loginRoute,{email:credentials.email,password:credentials.password})
         callback.onSuccess(result);
    }catch(error){
        callback.onError("invalid credentials");

    }
   
}
export {LoginHandler};