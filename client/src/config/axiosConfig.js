import axios from "axios";

let authTokens = localStorage.getItem("access_token")
  ? localStorage.getItem("access_token")
  : null;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/UnitedHome/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${authTokens?.accessToken}`,
  },
});

// ============== AXIOS INTERCEPTOR INITIALIZATION ========================

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (req) => {
    if (!authTokens) {
      authTokens =
        localStorage.getItem("access_token") !== "undefined"
          ? localStorage.getItem("access_token")
          : refreshToken();
    }
    req.headers.Authorization = `Bearer ${authTokens}`;
    console.log("Before Request....");
    return req;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("After Request....");
    const config = response.config;
    if (
      config.url.includes("/user/login") ||
      config.url.includes("/user/signup") ||
      config.url.includes("/user/refresh")
    )
      return response;

    return response;
  },
  async (error) => {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error, error.response);
    if (
      error.response.status === 401 &&
      ["Signature has expired", "Not enough segments"].includes(
        error.response.data.message
      )
    ) {
      let newAccToken = await refreshToken();
      localStorage.setItem("access_token", newAccToken);
      // error.config.headers["Authorization"] = "Bearer " + newAccToken;
      console.log(error.config);
      // window.location.reload(true);
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  return await axiosInstance
    .post("/user/refresh/", {
      refresh_token: localStorage.getItem("refresh_token"),
    })
    .then((tk) => {
      console.log("Successfully refresh");
      return tk.data.accessToken;
    })
    .catch((err) => alert(err.message));
};

// axiosInstance.setAccessToken = async (token) => {
//   localStorage.setItem("access_token", token);
// };

axiosInstance.login = (user) => axiosInstance.post("/user/login/", user);
axiosInstance.getLeagueTable = () => axiosInstance.get("/league/table");
axiosInstance.updateLeagueResults = (results) =>
  axiosInstance.put("http://localhost:8000/UnitedHome/league/table/", results);

export default axiosInstance;
