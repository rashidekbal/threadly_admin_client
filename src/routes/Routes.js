const baseServerUrl = "http://localhost:8001";
const serverUrl = baseServerUrl + "/api";
// const serverUrl = "https://threadly-ts-server.onrender.com/api";
const loginRoute = serverUrl + "/admin/v1/auth/login";
const usersRoute = serverUrl + "/admin/v1/users/";
const userInfoEditRoute = usersRoute + "edit/";
const userProfilePicEditRoute = usersRoute + "editProfilePic/";
const userPosts = serverUrl + "/admin/v1/posts/user/";
const userStory = serverUrl + "/admin/v1/story/";
const postCommentsRoute = serverUrl + "/admin/v1/comments/";
const overridePasswordRoute = serverUrl + "/admin/v1/users/overridePassword/";
const dashboardStatsRoute = serverUrl + "/admin/v1/stats";
const analyticsRoute = serverUrl + "/admin/v1/stats/analytics";
const restrictUserRoute = serverUrl + "/admin/v1/users/restrict/";
const unRestrictUserRoute = serverUrl + "/admin/v1/users/unRestrict/";
const allPostsRoute = serverUrl + "/admin/v1/posts/";
const deletePostRoute = serverUrl + "/admin/v1/posts/";
const deleteCommentRoute = serverUrl + "/admin/v1/comments/delete/";
const reportsRoute = serverUrl + "/admin/v1/reports/";
const userActivityRoute = serverUrl + "/admin/v1/users/activity/";
const platformActivityRoute = serverUrl + "/admin/v1/stats/activity";
const scanRoute = serverUrl + "/admin/v1/stats/scan";
const reportRoute = serverUrl + "/admin/v1/stats/report";
const anomaliesRoute = serverUrl + "/admin/v1/anomalies/";

export {
  loginRoute,
  usersRoute,
  serverUrl,
  userPosts,
  userStory,
  postCommentsRoute,
  overridePasswordRoute,
  userInfoEditRoute,
  userProfilePicEditRoute,
  dashboardStatsRoute,
  analyticsRoute,
  restrictUserRoute,
  unRestrictUserRoute,
  allPostsRoute,
  deletePostRoute,
  deleteCommentRoute,
  reportsRoute,
  userActivityRoute,
  platformActivityRoute,
  scanRoute,
  reportRoute,
  anomaliesRoute,
  baseServerUrl,
};
