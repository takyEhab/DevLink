import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import { UserProvider } from "./context/UserProvider";
import "./index.css";
import Auth from "./pages/Auth";
import FindDevelopers from "./pages/FindDevelopers";
import DeveloperProfile from "./pages/DeveloperProfile";
import Chat from "./components/chat-ui";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "auth", element: <Auth /> },
      { path: "find-dev", element: <FindDevelopers /> },
      { path: "developer/:name", element: <DeveloperProfile /> },
      { path: "messages", element: <Chat /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
