import axios from "axios";
// axios.defaults.baseURL = "http://127.0.0.1:8000";
axios.defaults.baseURL = "https://bug-alert-drf-7540ff833a9e.herokuapp.com";
// axios.defaults.baseURL = "https://bug-alert-drf44-f700216422bd.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

// export const axiosReq = axios.create();
// export const axiosRes = axios.create();
