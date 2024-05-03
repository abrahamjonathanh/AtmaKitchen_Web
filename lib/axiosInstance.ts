import axios from "axios";
import Cookies from "js-cookie";

export const axiosInstance = () => {
  const token = Cookies.get("token");

  const axiosClient = axios.create({
    baseURL: `${process.env.BASE_API}`,
    timeout: 5000,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosClient;
};
