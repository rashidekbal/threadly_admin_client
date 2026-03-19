import api from "./GeneralNetworkingModule.js";
import {
  overridePasswordRoute,
  restrictUserRoute,
  unRestrictUserRoute,
  userInfoEditRoute,
  userProfilePicEditRoute,
  usersRoute,
} from "../routes/Routes.js";

const getAllUsers = async (cb) => {
  try {
    const result = await api.get(usersRoute);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};
const getUser = async (userid, cb) => {
  try {
    const result = await api.get(usersRoute + userid);
    cb.success(result);
  } catch (err) {
    cb.error(err);
  }
};
const overrideUserPassword = async (uuid, newPassword, cb) => {
  const passwordOverrideRoute = overridePasswordRoute;
  try {
    const result = await api.patch(passwordOverrideRoute, {
      newPassword,
      uuid,
    });
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};
const removeProfilePic = async (uuid, cb) => {
  const url = userProfilePicEditRoute + uuid;
  try {
    const result = await api.delete(url);
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};
const updateProfilePic = async (uuid, imagePath, cb) => {
  const url = userProfilePicEditRoute + uuid;
  try {
    const form = new FormData();
    form.append("image", imagePath);
    const result = await api.patch(url, form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    cb.onSuccess(result);
  } catch (err) {
    cb.onError(err);
  }
};

const updateUserInfo = async (data, cb) => {
  try {
    const result = await api.patch(userInfoEditRoute, data);
    cb.onSuccess(result);
  } catch (error) {
    cb.onError(error);
  }
};

const createUser = async (formData, cb) => {
  try {
    const result = await api.post(usersRoute, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    cb.onSuccess(result);
  } catch (error) {
    cb.onError(error);
  }
};

// Arbitrary route for restricting an account

const restrictUser = async (uuid, payload, cb) => {
  try {
    const result = await api.patch(restrictUserRoute + uuid, payload);
    cb.onSuccess(result);
  } catch (error) {
    cb.onError(error);
  }
};
const unRestrictUser = async (uuid, cb) => {
  try {
    const result = await api.patch(unRestrictUserRoute + uuid);
    cb.onSuccess(result);
  } catch (error) {
    cb.onError(error);
  }
};

export {
  getAllUsers,
  getUser,
  overrideUserPassword,
  removeProfilePic,
  updateProfilePic,
  updateUserInfo,
  createUser,
  unRestrictUser,
  restrictUser,
};
