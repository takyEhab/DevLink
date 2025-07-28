"use client"

import { useState, useEffect } from "react"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Download,
  ArrowRight,
  Code,
  Palette,
  Database,
  Smartphone,
} from "lucide-react"

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
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

// Featured projects data (subset of full projects)
const featuredProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment processing and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    technologies: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task management with real-time updates and team features.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
    technologies: ["React", "Firebase", "Material-UI"],
  },
  {
    id: 3,
    title: "Blog CMS",
    description: "Content management system with markdown support and SEO optimization.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3?w=400&h=250&fit=crop",
    technologies: ["Next.js", "PostgreSQL", "Prisma"],
  },
]

const skills = [
  {
    icon: Code,
    title: "Frontend Development",
    description: "React, Vue.js, TypeScript, and modern CSS frameworks",
    technologies: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Node.js, Python, databases, and API development",
    technologies: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "React Native and cross-platform mobile applications",
    technologies: ["React Native", "Expo", "Flutter"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "User interface design and user experience optimization",
    technologies: ["Figma", "Adobe XD", "Sketch"],
  },
]

const HomePage = () => {
  const [currentRole, setCurrentRole] = useState(0)
  const roles = ["Full Stack Developer", "React Specialist", "UI/UX Enthusiast", "Problem Solver"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(156, 146, 172, 0.3) 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available for new opportunities</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Jane Doe
                  </span>
                </h1>

                <div className="text-xl lg:text-2xl text-gray-300 h-8">
                  <span className="transition-all duration-500 ease-in-out">{roles[currentRole]}</span>
                </div>

                <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                  I create exceptional digital experiences through clean code, thoughtful design, and innovative
                  solutions. Passionate about building user-friendly applications that make a difference.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="group">
                  View My Work
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-4">
                <span className="text-gray-400 text-sm">Connect with me:</span>
                <div className="flex gap-3">
                  <Button variant="ghost" size="icon" className="hover:text-blue-400">
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400">
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-400">
                    <Mail className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=500&h=600&fit=crop&crop=face"
                  alt="Jane Doe"
                  className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">What I Do</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              I specialize in creating end-to-end digital solutions with expertise across the full development stack
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="group hover:scale-105 transition-all duration-300 hover:border-blue-500/50">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600/30 transition-colors">
                    <skill.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">{skill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm mb-4 text-center">{skill.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {skill.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Projects</h2>
              <p className="text-gray-400 text-lg">Some of my recent work that I'm proud of</p>
            </div>
            <Button variant="outline" className="hidden sm:flex bg-transparent">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Card key={project.id} className="group hover:scale-105 transition-all duration-300 overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader>
                  <CardTitle className="group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12 sm:hidden">
            <Button variant="outline">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-blue-400">50+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-green-400">3+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-purple-400">25+</div>
              <div className="text-gray-400">Happy Clients</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-orange-400">15+</div>
              <div className="text-gray-400">Technologies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and exciting projects. Let's discuss how we can bring your ideas
            to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>jane.doe@email.com</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 text-blue-400" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <Mail className="w-4 h-4 mr-2" />
              Get In Touch
            </Button>
            <Button variant="outline" size="lg">
              <Phone className="w-4 h-4 mr-2" />
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
