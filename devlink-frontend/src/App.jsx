"use client";

import { useState } from "react";
import "./index.css";

// Import components directly in this file to avoid import issues
import DeveloperProfile from "../components/developer-profile";
import HomeForPage from "../components/HomeForPage";
import ProjectsPage from "../components/AllProjectsPage";
import PlatformHome from "../components/Home";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="App">
      {/* Simple Navigation */}
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
              All Projects
            </button>
            
            <button
              onClick={() => setCurrentPage("homeForPage")}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentPage === "homeForPage"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:text-white hover:bg-gray-700"
              }`}
            >
              Projects for one
            </button>
          </div>
          {/* my logo */}
          <div class="devlink-logo">
            <span class="dev">Dev</span>
            <span class="dot">•</span>
            <span class="link">Link</span>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      {currentPage === "home" && <PlatformHome />}
      {currentPage === "profile" && <DeveloperProfile />}
      {currentPage === "projects" && <ProjectsPage />}
      {currentPage === "homeForPage" && <HomeForPage />}
    </div>
  );
}

export default App;
