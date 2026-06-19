import axios from "axios";

const API_BASE =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://wheat-eagle-393999.hostingersite.com/api";

const api = axios.create({
  baseURL: API_BASE,
});

export default api;