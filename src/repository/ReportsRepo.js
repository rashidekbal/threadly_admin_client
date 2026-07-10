import api from "./GeneralNetworkingModule.js";
import { reportsRoute } from "../routes/Routes.js";

const getReports = async (status = "pending", cb) => {
  try {
    const result = await api.get(reportsRoute + "?status=" + status);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};

const updateReportStatus = async (reportid, status, cb) => {
  try {
    const result = await api.patch(reportsRoute + reportid, { status });
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

export { getReports, updateReportStatus };
