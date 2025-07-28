"use client"

import { useState } from "react"
import { Github, ExternalLink, Calendar, Search, Filter } from "lucide-react"

// Reusing the same UI components from the profile page
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 py-1 px-3 text-xs",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-lg border bg-gray-800 border-gray-700 text-white shadow-lg hover:shadow-xl transition-shadow ${className}`}
    {...props}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className = "", ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
)

const CardTitle = ({ children, className = "", ...props }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
)

const CardContent = ({ children, className = "", ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
)

const CardDescription = ({ children, className = "", ...props }) => (
  <p className={`text-sm text-gray-400 ${className}`} {...props}>
    {children}
  </p>
)

const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white",
    outline: "border border-gray-500 text-gray-300 hover:bg-gray-700",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
)

// Sample project data
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with user authentication, payment processing, and admin dashboard. Built with modern web technologies for optimal performance.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "JWT"],
    category: "Full Stack",
    demoUrl: "https://demo-ecommerce.com",
    githubUrl: "https://github.com/janedoe/ecommerce-platform",
    date: "2024-01-15",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    technologies: ["React", "Firebase", "Material-UI", "Socket.io"],
    category: "Frontend",
    demoUrl: "https://taskmanager-demo.com",
    githubUrl: "https://github.com/janedoe/task-manager",
    date: "2023-11-20",
    featured: false,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that displays current conditions, forecasts, and weather maps using multiple weather APIs.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
    technologies: ["JavaScript", "Chart.js", "OpenWeather API", "CSS3"],
    category: "Frontend",
    demoUrl: "https://weather-dashboard-demo.com",
    githubUrl: "https://github.com/janedoe/weather-dashboard",
    date: "2023-09-10",
    featured: false,
  },
  {
    id: 4,
    title: "Blog CMS",
    description:
      "A content management system for bloggers with markdown support, SEO optimization, and analytics integration.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=400&h=250&fit=crop",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS"],
    category: "Full Stack",
    demoUrl: "https://blog-cms-demo.com",
    githubUrl: "https://github.com/janedoe/blog-cms",
    date: "2023-07-05",
    featured: true,
  },
  {
    id: 5,
    title: "API Gateway",
    description: "A microservices API gateway with rate limiting, authentication, and request routing capabilities.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    technologies: ["Node.js", "Express", "Redis", "Docker", "JWT"],
    category: "Backend",
    demoUrl: null,
    githubUrl: "https://github.com/janedoe/api-gateway",
    date: "2023-05-12",
    featured: false,
  },
  {
    id: 6,
    title: "Mobile Fitness App",
    description: "A React Native fitness tracking app with workout plans, progress tracking, and social features.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop",
    technologies: ["React Native", "Expo", "Firebase", "Redux"],
    category: "Mobile",
    demoUrl: "https://fitness-app-demo.com",
    githubUrl: "https://github.com/janedoe/fitness-app",
    date: "2023-03-18",
    featured: false,
  },
]

const categories = ["All", "Full Stack", "Frontend", "Backend", "Mobile"]

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredProjects = projectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
    const matchesFeatured = !showFeaturedOnly || project.featured

    return matchesSearch && matchesCategory && matchesFeatured
  })

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    })
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Projects</h1>
              <p className="text-gray-400 mt-1">A showcase of my development work</p>
            </div>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
              <ExternalLink className="w-4 h-4 mr-2" />
              View Resume
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Featured Toggle */}
            <Button
              variant={showFeaturedOnly ? "default" : "outline"}
              onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
              className="border-gray-600"
            >
              <Filter className="w-4 h-4 mr-2" />
              Featured Only
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="border-gray-600"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.id} className="group hover:scale-105 transition-transform duration-200">
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="default" className="bg-yellow-600 hover:bg-yellow-700">
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <Badge variant="secondary" className="bg-gray-900/80">
                    {project.category}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                  <div className="flex items-center text-gray-400 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(project.date)}
                  </div>
                </div>
                <CardDescription className="line-clamp-3">{project.description}</CardDescription>
              </CardHeader>

              <CardContent>
                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.demoUrl && (
                    <Button size="sm" className="flex-1">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Demo
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1 border-gray-600 bg-transparent">
                    <Github className="w-3 h-3 mr-1" />
                    Code
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg">No projects found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("All")
                setShowFeaturedOnly(false)
              }}
              className="border-gray-600"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">{projectsData.length}</div>
              <div className="text-gray-400 text-sm">Total Projects</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">{projectsData.filter((p) => p.featured).length}</div>
              <div className="text-gray-400 text-sm">Featured</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">
                {new Set(projectsData.flatMap((p) => p.technologies)).size}
              </div>
              <div className="text-gray-400 text-sm">Technologies</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-400">
                {new Set(projectsData.map((p) => p.category)).size}
              </div>
              <div className="text-gray-400 text-sm">Categories</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
