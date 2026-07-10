import api from "./GeneralNetworkingModule.js";
import { platformActivityRoute } from "../routes/Routes.js";

const getPlatformActivity = async (page = 1, cb) => {
  try {
    const result = await api.get(`${platformActivityRoute}?page=${page}`);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};

export { getPlatformActivity };
