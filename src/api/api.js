import axios from "axios";

const api = axios.create({
  baseURL: "wheat-eagle-393999.hostingersite.com",
});

export default api;