const setSecretTokenLocalStorage=(token)=>{
    window.localStorage.setItem("token",token)

}
const getSecretTokenLocalStorage=()=>{
    const token=window.localStorage.getItem("token");
    if(!token)return null;
    return token;
}
const removeSecretKeyLocalStorage=()=>{
    window.localStorage.removeItem("token");
}
export {getSecretTokenLocalStorage,setSecretTokenLocalStorage,removeSecretKeyLocalStorage}