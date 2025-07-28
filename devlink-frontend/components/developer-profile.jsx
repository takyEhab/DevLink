import { Github, Linkedin, MapPin } from "lucide-react";
import { useState } from "react";

// Simple Button component
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple Card components
const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className = "", ...props }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

// Simple Badge component
const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-primary hover:bg-primary/80 text-primary-foreground",
    secondary: "bg-secondary hover:bg-secondary/80 text-secondary-foreground",
  };

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors 
        focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default function DeveloperProfile() {
  const [currentPage, setCurrentPage] = useState("");
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">DevConnect</h1>
        <Button
          variant="outline"
          className="border-gray-600 text-white hover:bg-gray-800 bg-transparent"
        >
          Connect
        </Button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face"
              alt="Jane Doe"
              width="120"
              height="120"
              className="rounded-full border-4 border-gray-700 w-30 h-30 object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2">Jane Doe</h2>
            <p className="text-gray-400 text-lg mb-3">Full Stack Developer</p>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">San Francisco, CA</span>
            </div>
            <div className="flex gap-3 justify-center md:justify-start">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-8 mb-8 border-b border-gray-800">
          {/* <button className="pb-3 border-b-2 border-blue-500 text-blue-400 font-medium">About</button> */}
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev === "about" ? "" : "about"))
            }
            className={`pb-3 hover:text-white font-medium ${
              currentPage === "about"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400"
            }`}
          >
            About
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev === "projects" ? "" : "projects"))
            }
            className={`pb-3 hover:text-white font-medium ${
              currentPage === "projects"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400"
            }`}
            // className="pb-3 text-gray-400 hover:text-white font-medium"
          >
            Projects
          </button>
          <button
            onClick={() =>
              setCurrentPage((prev) => (prev === "skills" ? "" : "skills"))
            }
            className={`pb-3 hover:text-white font-medium ${
              currentPage === "skills"
                ? "border-b-2 border-blue-500 text-blue-400"
                : "text-gray-400"
            }`}
          >
            Skills
          </button>
        </div>

        {/* About Section */}
        <section className="mb-8">
          <p className="text-gray-300 text-lg leading-relaxed">
            Full stack developer with a passion for building user-friendly
            applications. Experienced in React, Node.js, and MongoDB.
          </p>
        </section>

        {/* Projects Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Project One</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Description of project.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Project Two</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Description of project.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Project Three</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">
                  Description of project.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Skills Section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-6">Skills</h3>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant="secondary"
              className="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 text-sm"
            >
              React
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 text-sm"
            >
              Node.js
            </Badge>
            <Badge
              variant="secondary"
              className="bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 text-sm"
            >
              MongoDB
            </Badge>
          </div>
        </section>

        {/* About Section (Extended) */}
        <section>
          <h3 className="text-xl font-semibold mb-4">About</h3>
          <p className="text-gray-300 leading-relaxed">
            Full stack developer with a passion for building user-friendly
            applications. Experienced in modern web technologies and always
            eager to learn new tools and frameworks. I enjoy creating efficient,
            scalable solutions that provide great user experiences.
          </p>
        </section>
      </main>
    </div>
  );
}
