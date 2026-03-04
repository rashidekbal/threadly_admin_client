const serverUrl="http://localhost:8001/api";
// const serverUrl="https://threadlyserver.onrender.com/api"
const loginRoute=serverUrl+"/admin/v1/auth/login";
const usersRoute=serverUrl+"/admin/v1/users/"
const userPosts=serverUrl+"/admin/v1/posts/"
const userStory=serverUrl+"/admin/v1/story/"
const postCommentsRoute=serverUrl+"/admin/v1/comments/"
export {loginRoute,usersRoute,serverUrl,userPosts,userStory,postCommentsRoute}