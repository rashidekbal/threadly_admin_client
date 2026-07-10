import api from "./GeneralNetworkingModule.js";
import { platformActivityRoute } from "../routes/Routes.js";

const getPlatformActivity = async (cb) => {
  try {
    const result = await api.get(platformActivityRoute);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};

export { getPlatformActivity };
