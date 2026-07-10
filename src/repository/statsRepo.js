import { dashboardStatsRoute, analyticsRoute, scanRoute, reportRoute } from "../routes/Routes.js";
import api from "./GeneralNetworkingModule.js";

async function getDashBoardStats(cb) {
  try {
    let result = await api.get(dashboardStatsRoute);
    return cb.onSuccess(result);
  } catch (error) {
    return cb.onError(error);
  }
}

const getAnalytics = async (usersPage = 1, postsPage = 1, cb) => {
  try {
    const result = await api.get(`${analyticsRoute}?usersPage=${usersPage}&postsPage=${postsPage}`);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};

const getSystemScan = async (cb) => {
  try {
    const result = await api.get(scanRoute);
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

const getDashboardReport = async (cb) => {
  try {
    const result = await api.get(reportRoute);
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

export { getDashBoardStats, getAnalytics, getSystemScan, getDashboardReport };