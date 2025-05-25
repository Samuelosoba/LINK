import axiosInstance from "../utils/axiosInstance";
export const changeUrl = async (formData, token) => {
  return await axiosInstance.post("/url/shorten", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// /src/api/url.js
export const getUserLinks = async (token) => {
  return await axiosInstance.get("/url/user-links", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const fetchAnalytics = async (token,shortPath) => {
  return await axiosInstance.get(`/url/analytics/${shortPath}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
