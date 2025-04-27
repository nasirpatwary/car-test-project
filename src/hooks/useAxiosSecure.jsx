import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});
const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        // Do something before request is sent
        return res;
      },
      async (error) => {
        // Do something with request error
        if (error.response.status === 401 || error.response.status === 403) {
          signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [signOutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
