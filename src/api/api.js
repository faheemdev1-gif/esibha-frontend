import axios from "axios";
export const API_BASE =
  import.meta.env.VITE_API_URL ||
  (["localhost", "127.0.0.1"].includes(window.location.hostname)
    ? "http://localhost:5000/api"
    : "https://wheat-eagle-393999.hostingersite.com/api");
const api = axios.create({ baseURL: API_BASE, timeout: 30000 });
// Separate client: admin credentials are never attached to public storefront requests.
export const adminApi = axios.create({ baseURL: API_BASE, timeout: 30000 });
adminApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("esibha_admin_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      !error.config?.url?.endsWith("/login")
    ) {
      sessionStorage.removeItem("esibha_admin_token");
      window.dispatchEvent(new Event("esibha-admin-expired"));
    }
    return Promise.reject(error);
  },
);
export const mediaUrl = (path) =>
  path?.startsWith("/api/media/")
    ? `${API_BASE.replace(/\/api\/?$/, "")}${path}`
    : path;
export default api;
