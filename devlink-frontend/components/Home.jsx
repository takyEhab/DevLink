"use client"

import { useState } from "react"
import { Github, Linkedin, MapPin, Star, Users, Code, Search, TrendingUp, Award, ExternalLink } from "lucide-react"


// Reusing the same UI components
const Button = ({ children, variant = "default", size = "default", className = "", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-600 text-white hover:bg-gray-800 bg-transparent",
    ghost: "hover:bg-gray-800 text-gray-300 hover:text-white",
    secondary: "bg-gray-700 text-white hover:bg-gray-600",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-8 py-1 px-3 text-xs",
    lg: "h-12 py-3 px-6 text-base",
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
    className={`rounded-lg border bg-gray-800 border-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
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

const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white",
    outline: "border border-gray-500 text-gray-300 hover:bg-gray-700",
    success: "bg-green-600 hover:bg-green-700 text-white",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
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

// Sample developers data
const developersData = [
  {
    id: 1,
    name: "Jane Doe",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=120&h=120&fit=crop&crop=face",
    rating: 4.9,
    projects: 24,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    specialties: ["E-commerce", "SaaS", "Mobile Apps"],
    hourlyRate: "$85/hr",
    availability: "Available",
    featured: true,
    recentProject: {
      title: "E-Commerce Platform",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop",
    },
  },
  {
    id: 2,
    name: "Alex Chen",
    title: "Frontend Specialist",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
    rating: 4.8,
    projects: 18,
    skills: ["React", "Vue.js", "CSS", "Figma"],
    specialties: ["UI/UX", "Animation", "Design Systems"],
    hourlyRate: "$75/hr",
    availability: "Available",
    featured: false,
    recentProject: {
      title: "Design System",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=200&fit=crop",
    },
  },
  {
    id: 3,
    name: "Sarah Johnson",
    title: "Backend Engineer",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face",
    rating: 4.9,
    projects: 31,
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    specialties: ["APIs", "Microservices", "DevOps"],
    hourlyRate: "$90/hr",
    availability: "Busy",
    featured: true,
    recentProject: {
      title: "API Gateway",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=200&fit=crop",
    },
  },
  {
    id: 4,
    name: "Mike Rodriguez",
    title: "Mobile Developer",
    location: "Los Angeles, CA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
    rating: 4.7,
    projects: 15,
    skills: ["React Native", "Flutter", "iOS", "Android"],
    specialties: ["Cross-platform", "Native Apps", "Performance"],
    hourlyRate: "$80/hr",
    availability: "Available",
    featured: false,
    recentProject: {
      title: "Fitness App",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop",
    },
  },
  {
    id: 5,
    name: "Emily Davis",
    title: "DevOps Engineer",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face",
    rating: 4.8,
    projects: 22,
    skills: ["AWS", "Kubernetes", "Terraform", "CI/CD"],
    specialties: ["Cloud Architecture", "Automation", "Security"],
    hourlyRate: "$95/hr",
    availability: "Available",
    featured: true,
    recentProject: {
      title: "Cloud Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=200&fit=crop",
    },
  },
  {
    id: 6,
    name: "David Kim",
    title: "Data Scientist",
    location: "Boston, MA",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    rating: 4.9,
    projects: 19,
    skills: ["Python", "TensorFlow", "SQL", "R"],
    specialties: ["Machine Learning", "Analytics", "Visualization"],
    hourlyRate: "$100/hr",
    availability: "Available",
    featured: false,
    recentProject: {
      title: "ML Dashboard",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    },
  },
]

const categories = ["All", "Frontend", "Backend", "Full Stack", "Mobile", "DevOps", "Data Science"]

const PlatformHome = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredDevelopers = developersData.filter((developer) => {
    const matchesSearch =
      developer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      developer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      developer.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      developer.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesCategory =
      selectedCategory === "All" || developer.title.toLowerCase().includes(selectedCategory.toLowerCase())
    const matchesFeatured = !showFeaturedOnly || developer.featured

    return matchesSearch && matchesCategory && matchesFeatured
  })

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Find the Perfect{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Developer
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Connect with talented developers from around the world. Browse portfolios, view projects, and hire the
              best talent for your next project.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search developers, skills, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 text-lg"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-400">500+</div>
                <div className="text-gray-400">Developers</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-400">1,200+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-purple-400">98%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-orange-400">4.8★</div>
                <div className="text-gray-400">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
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

            <div className="flex gap-4">
              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="border-gray-600"
                size="sm"
              >
                <Star className="w-4 h-4 mr-2" />
                Featured Only
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Developers Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDevelopers.map((developer) => (
              <Card key={developer.id} className="group hover:scale-105 transition-all duration-300 overflow-hidden">
                {/* Developer Header */}
                <CardHeader className="relative">
                  {developer.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="success" className="bg-yellow-600 hover:bg-yellow-700">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}

                  <div className="flex items-start gap-4">
                    <img
                      src={developer.avatar || "/placeholder.svg"}
                      alt={developer.name}
                      className="w-16 h-16 rounded-full border-2 border-gray-600"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold group-hover:text-blue-400 transition-colors">
                        {developer.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{developer.title}</p>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                        <MapPin className="w-3 h-3" />
                        {developer.location}
                      </div>
                    </div>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{developer.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Code className="w-4 h-4" />
                        <span className="text-sm">{developer.projects} projects</span>
                      </div>
                    </div>
                    <Badge
                      variant={developer.availability === "Available" ? "success" : "secondary"}
                      className={
                        developer.availability === "Available"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-orange-600 hover:bg-orange-700"
                      }
                    >
                      {developer.availability}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Recent Project */}
                  <div className="mb-4">
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={developer.recentProject.image || "/placeholder.svg"}
                        alt={developer.recentProject.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-2 left-2 text-white text-sm font-medium">
                        {developer.recentProject.title}
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {developer.skills.slice(0, 4).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {developer.skills.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{developer.skills.length - 4}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="text-gray-400 text-xs mb-2">Specializes in:</p>
                    <p className="text-sm">{developer.specialties.join(", ")}</p>
                  </div>

                  {/* Rate and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold text-blue-400">{developer.hourlyRate}</div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="hover:text-blue-400">
                        <Github className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-blue-400">
                        <Linkedin className="w-4 h-4" />
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredDevelopers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg">No developers found</p>
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of companies that have found their perfect developer match. Post your project and get
            proposals from qualified developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <TrendingUp className="w-4 h-4 mr-2" />
              Post a Project
            </Button>
            <Button variant="outline" size="lg">
              <Award className="w-4 h-4 mr-2" />
              Join as Developer
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PlatformHome
