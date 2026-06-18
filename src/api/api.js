import axios from "axios";

const api = axios.create({
  baseURL: "https://wheat-eagle-393999.hostingersite.com/api",
});

export default api;