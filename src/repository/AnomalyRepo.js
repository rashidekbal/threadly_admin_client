import api from "./GeneralNetworkingModule.js";
import { anomaliesRoute } from "../routes/Routes.js";

const getAnomalies = async (status = "unresolved", cb) => {
  try {
    const result = await api.get(anomaliesRoute + "?status=" + status);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};

const resolveAnomaly = async (anomalyId, cb) => {
  try {
    const result = await api.patch(anomaliesRoute + anomalyId);
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

export { getAnomalies, resolveAnomaly };
