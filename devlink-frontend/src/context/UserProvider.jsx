// import { useState } from "react";
// import { UserContext } from "./UserContext";

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   return (
//     <UserContext.Provider value={{ user, setUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// context/UserProvider.jsx
import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { checkAuth, login, logout } from "../services/auth";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Optional: for loading state

  // Check auth when app loads
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await checkAuth();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Optional: login and logout helpers
  const apiLogin = async (email, password) => {
    const data = await login(email, password);
    // const data = await checkAuth();
    // console.log(data.data.user);
    setUser(data.data.user);
    return data;
  };

  const apiLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, apiLogin, apiLogout, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
