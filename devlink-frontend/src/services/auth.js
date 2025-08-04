// // src/services/auth.js
// import axios from "axios";

// const API_URL = "http://localhost:3000/api";

// export const checkAuth = async () => {
//   const res = await axios.get(`${API_URL}/is-authenticated`, {
//     withCredentials: true,
//   });
//   return res.data; // { isAuthenticated, user }
// };

// export const login = async (email, password) => {
//   const res = await axios.post(
//     `${API_URL}/login`,
//     { email, password },
//     { withCredentials: true }
//   );
//   return res.data;
// };

// export const logout = async () => {
//   await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
// };


// services/auth.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const checkAuth = async () => {
  const res = await axios.get(`${API_URL}/auth/is-authenticated`, {
    withCredentials: true,
  });
  return res.data; // { isAuthenticated, user }
};

export const login = async (email, password) => {
  const res = await axios.post(
    `${API_URL}/auth/login`,
    { email, password },
    { withCredentials: true }
  );
  return res.data;
};

export const logout = async () => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
