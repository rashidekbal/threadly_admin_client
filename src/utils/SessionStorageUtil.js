const setSecretToken=async(token)=>{
        sessionStorage.setItem("token",token);
}
const getSecretToken=()=>{
    const token=sessionStorage.getItem("token");
    if(!token)return null;
    return token;

}
const removeSecretKey=()=>{
    window.sessionStorage.removeItem("token");
}
export {getSecretToken,setSecretToken,removeSecretKey}