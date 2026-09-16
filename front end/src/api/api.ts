import axios from "axios";

const api = axios.create({

  //  baseURL: "http://localhost:4000",
  baseURL: "http://localhost:31156",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
     if (
      error.response?.status === 401 &&
      error.config?.url !== "/auth/login"
    ) {
      window.location.replace("/login?expired=true");
    }
    // if (error.response?.status === 401) {
    //   window.location.replace("/login");
    // }

    return Promise.reject(error);
  }
);

export default api;