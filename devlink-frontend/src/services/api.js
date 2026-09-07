import axios from "axios";

export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/\/$/, "");

export const SOCKET_URL = (
  import.meta.env.VITE_SOCKET_URL || API_URL.replace(/\/api$/, "")
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
