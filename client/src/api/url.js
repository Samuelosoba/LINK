import axiosInstance from "../utils/axiosInstance";
export const changeUrl = async (formdata) => {
  return await axiosInstance.post("/url/shorten", formdata);
};
