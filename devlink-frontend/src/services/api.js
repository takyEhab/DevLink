import axios from "axios";

export const API_URL = (
  import.meta.env.VITE_API_URL || "https://dev-link-backend-opal.vercel.app"
).replace(/\/$/, "");

export const SOCKET_URL = (
  import.meta.env.VITE_SOCKET_URL || "https://dev-link-backend-opal.vercel.app"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default api;
