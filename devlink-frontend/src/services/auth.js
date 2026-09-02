import api from "./api";

export const checkAuth = async () => {
  const res = await api.get("/users/is-authenticated");
  return res.data; // { isAuthenticated, user }
};

export const login = async (email, password) => {
  const res = await api.post("/users/login", { email, password });
  return res.data;
};

export const logout = async () => {
  await api.post("/users/logout");
};
