import { useContext, useState } from "react";

// Import components directly in this file to avoid import issues
import DeveloperProfile from "./components/developer-profile";
import ProjectsPage from "./components/projects-page";
import PlatformHome from "./components/platform-home";
import AuthPages from "./components/auth-pages";
import ChatUI from "./components/chat-ui";
import HomeForPage from "./components/HomeForPage";
import Auth from "./components/Auth";
import { ToastContainer } from "react-toastify";
import { UserContext } from "./context/UserContext";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import DeveloperProfileView from "./pages/developer-profile-view";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="App">
      <ToastContainer />

      <Header user={{ name: "taky", title: "developer" }} />
      {/* {currentPage !== "auth" && currentPage !== "chat" && (
        <nav className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage("home")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === "home"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Home
              </button>
              <button
                onClick={() => setCurrentPage("profile")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === "profile"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setCurrentPage("projects")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === "projects"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Projects
              </button>
              <button
                onClick={() => setCurrentPage("chat")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === "chat"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                Messages
              </button>
              <button
                onClick={() => setCurrentPage("homeForPage")}
                className={`px-4 py-2 rounded-md transition-colors ${
                  currentPage === "homeForPage"
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                homeForPage
              </button>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-white">DevConnect</div>
              <button
                onClick={() => setCurrentPage("auth")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </nav>
      )} */}

      {/* Page Content */}
      {/* <Home /> */}
      {/* <Profile
        user={{
          name: "taky",
          title: "coder",
          skills: ["css", "js"],
          location: "San Francisco, CA",
          bio: "Passionate developer with 5+ years of experience building web applications.",
          email:"tky@gmail.com"
        }}
      /> */}
      <DeveloperProfileView
        developer={{
          name: "taky",
          title: "coder",
          skills: ["css", "js"],
          location: "San Francisco, CA",
          bio: "Passionate developer with 5+ years of experience building web applications.",
          email: "tky@gmail.com",
          
        }}
      />
      {/* {currentPage === "home" && <PlatformHome />}
      {currentPage === "profile" && <DeveloperProfile />}
      {currentPage === "projects" && <ProjectsPage />}
      {currentPage === "chat" && (
        <ChatUI onBack={() => setCurrentPage("home")} />
      )}
      {currentPage === "auth" && <Auth onBack={() => setCurrentPage("home")} />}
      {currentPage === "homeForPage" && <HomeForPage />} */}
    </div>
  );
}

export default App;
