import { useContext } from "react";
import Header from "./components/Header";
import { Outlet, useLocation } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import Loading from "./components/Loading";

export default function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/auth";
  // for multiple routes
  // or ['/login', '/register'].includes()
  const { loading } = useContext(UserContext);

  return (
    <>
      {!hideNavbar && <Header />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <ToastContainer theme="dark" />
          <Outlet />
        </>
      )}
    </>
  );
}
