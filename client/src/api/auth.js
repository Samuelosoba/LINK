import axiosInstance from "../utils/axiosInstance";
export const registerUser = async (formdata) => {
  return await axiosInstance.post("/auth/register", formdata);
};
export const loginUser = async (formdata) => {
  return await axiosInstance.post("/auth/login", formdata);
};
export const authenticateUser = async (token) => {
  return await axiosInstance.get("/auth/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getUserStat = async (token) => {
  return await axiosInstance.get("/auth/userStats", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
