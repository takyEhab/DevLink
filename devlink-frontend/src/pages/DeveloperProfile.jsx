import { useState, useContext } from "react";
import {
  Star,
  MapPin,
  Code,
  Users,
  Heart,
  MessageCircle,
  Clock,
  Globe,
  Github,
  Linkedin,
  Mail,
  Phone,
  Share2,
  CheckCircle,
  XCircle,
  Sparkles,
  Target,
  ArrowLeft,
  GraduationCap,
  Languages,
  Shield,
  FolderOpen,
  Edit,
  Plus,
  Info,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

// Enhanced UI components with custom styling
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default:
      "bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105",
    outline:
      "border-2 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-400 bg-transparent backdrop-blur-sm",
    ghost: "hover:bg-emerald-500/10 text-emerald-400 hover:text-emerald-300",
    secondary: "bg-slate-700 text-white hover:bg-slate-600",
    glass:
      "bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20",
    success: "bg-emerald-600 text-white hover:bg-emerald-700",
    warning: "bg-amber-600 text-white hover:bg-amber-700",
    premium:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
  };

  const sizes = {
    default: "h-11 py-2.5 px-5",
    sm: "h-9 py-1.5 px-3 text-xs",
    lg: "h-14 py-3.5 px-8 text-base",
    icon: "h-11 w-11",
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

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-2xl border bg-slate-800/60 border-slate-700/50 text-white shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm hover:bg-slate-800/80 hover:border-emerald-500/30 group ${className}`}
    {...props}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-gradient-to-r from-emerald-500 to-teal-500 text-white",
    secondary: "bg-slate-700 hover:bg-slate-600 text-slate-300",
    outline:
      "border border-emerald-400/40 text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20",
    success: "bg-emerald-600/20 border border-emerald-500/40 text-emerald-400",
    warning: "bg-amber-600/20 border border-amber-500/40 text-amber-400",
    danger: "bg-red-600/20 border border-red-500/40 text-red-400",
    premium: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
    glow: "bg-emerald-400/20 border border-emerald-400/50 text-emerald-300 shadow-lg shadow-emerald-500/25",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

// Sample developer data (in a real app, this would come from an API)
const developerData = {
  id: 1,
  name: "Sarah Johnson",
  title: "Senior Full Stack Developer",
  location: "San Francisco, CA",
  avatar:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  coverImage:
    "https://i.pinimg.com/originals/c8/67/3a/c8673ad4c46ade00cf3bd0049db62b16.jpg",
  projects: 24,
  completedProjects: 89,
  skills: [
    "React",
    "Node.js",
    "TypeScript",
    "AWS",
    "MongoDB",
    "Docker",
    "Python",
    "Vue.js",
    "PostgreSQL",
    "Redis",
    "GraphQL",
    "Kubernetes",
  ],
  specialties: [
    "E-commerce",
    "SaaS",
    "API Development",
    "Cloud Architecture",
    "Microservices",
    "DevOps",
  ],
  languages: ["English", "Spanish"],
  education: "BS Computer Science, Stanford University",
  bio: "I'm a seasoned full-stack developer with a passion for creating innovative digital solutions. With over 8 years of experience in the tech industry, I've worked with startups and enterprise companies to build scalable, high-performance applications. My expertise spans the entire development stack, from frontend frameworks like React and Vue.js to backend technologies like Node.js and Python. I'm particularly skilled in cloud architecture and DevOps practices, having deployed applications on AWS, Google Cloud, and Azure. I believe in writing clean, maintainable code and following best practices to ensure long-term project success.",
  socialLinks: {
    github: "https://github.com/sarahjohnson",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    portfolio: "https://sarahjohnson.dev",
  },
  recentProjects: [
    {
      id: 1,
      title: "E-Commerce Platform",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tech: ["React", "Node.js", "Stripe", "MongoDB"],
      description:
        "A full-featured e-commerce platform with payment processing, inventory management, and admin dashboard.",
      status: "Completed",
      rating: 5.0,
      budget: 15000,
      duration: "3 months",
      client: "TechStart Inc.",
    },
    {
      id: 2,
      title: "SaaS Dashboard",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      tech: ["Vue.js", "Python", "PostgreSQL", "Redis"],
      description:
        "Analytics dashboard for SaaS companies with real-time data visualization and reporting tools.",
      status: "Completed",
      rating: 4.8,
      budget: 12000,
      duration: "2.5 months",
      client: "DataFlow Solutions",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
      tech: ["React Native", "Node.js", "PostgreSQL", "AWS"],
      description:
        "Secure mobile banking application with biometric authentication and real-time transaction processing.",
      status: "In Progress",
      rating: null,
      budget: 25000,
      duration: "4 months",
      client: "FinTech Pro",
    },
  ],
  testimonials: [
    {
      id: 1,
      client: "Alex Chen",
      company: "TechStart Inc.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Sarah delivered our e-commerce platform ahead of schedule and exceeded all our expectations. Her attention to detail and technical expertise are outstanding.",
      date: "2024-01-15",
    },
    {
      id: 2,
      client: "Maria Rodriguez",
      company: "DataFlow Solutions",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5,
      text: "Working with Sarah was a pleasure. She understood our requirements perfectly and delivered a solution that perfectly fits our business needs.",
      date: "2023-12-20",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      badge:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&fit=crop",
    },
    {
      name: "Google Cloud Professional Developer",
      issuer: "Google",
      date: "2023",
      badge:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=80&h=80&fit=crop",
    },
  ],
};

const DeveloperProfile = () => {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [isSaving, setIsSaving] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "Sarah Johnson",
    title: "Senior Full Stack Developer",
    location: "San Francisco, CA",
    bio: "I'm a seasoned full-stack developer with a passion for creating innovative digital solutions. With over 8 years of experience in the tech industry, I've worked with startups and enterprise companies to build scalable, high-performance applications. My expertise spans the entire development stack, from frontend frameworks like React and Vue.js to backend technologies like Node.js and Python. I'm particularly skilled in cloud architecture and DevOps practices, having deployed applications on AWS, Google Cloud, and Azure. I believe in writing clean, maintainable code and following best practices to ensure long-term project success.",
    experience: "8+ years",
    education: "BS Computer Science, Stanford University",
    languages: ["English", "Spanish"],
    skills: [
      "React",
      "Node.js",
      "TypeScript",
      "AWS",
      "MongoDB",
      "Docker",
      "Python",
      "Vue.js",
      "PostgreSQL",
      "Redis",
      "GraphQL",
      "Kubernetes",
    ],
    specialties: [
      "E-commerce",
      "SaaS",
      "API Development",
      "Cloud Architecture",
      "Microservices",
      "DevOps",
    ],
    socialLinks: {
      github: "https://github.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      twitter: "https://twitter.com/sarahjohnson",
      portfolio: "https://sarahjohnson.dev",
    },
  });

  // Get current user from context
  const currentUser = useContext(UserContext);
  const isOwnProfile = currentUser?.user?.name === name;

  // In a real app, you would fetch developer data based on the ID
  const developer = developerData;

  const tabs = [
    { id: "overview", label: "Overview", icon: Users },
    { id: "projects", label: "Projects", icon: FolderOpen },
  ];

  const saveChanges = async () => {
    try {
      setIsSaving(true);

      // simulate async call or actual backend request here
      console.log(editForm);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // example delay

      toast.success("Profile updated!");
      setIsEditMode(false);
    } catch (error) {
      toast.error("Failed to save changes.");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareProfile = async () => {
    const fullUrl =
      window.location.origin + location.pathname + location.search;

    try {
      await navigator.clipboard.writeText(fullUrl);
      toast.success("Link copied!", {
        closeButton: false,
        hideProgressBar: true,
        autoClose: 1500,
      });
    } catch (err) {
      toast.error("Failed to copy link.");
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        {/* Back Button */}
        <div className="container mx-auto px-4 py-6">
          <Link
            to={isOwnProfile ? "/" : "/find-dev"}
            className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {isOwnProfile ? "Back to Home Page" : "Back to Developers"}
          </Link>
        </div>

        {/* Cover Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={
              developer.coverImage ||
              "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop"
            }
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=400&fit=crop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
        </div>

        {/* Profile Header */}
        <div className="container mx-auto px-4 -mt-20 relative z-20">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="relative">
              <img
                src={
                  developer.avatar ||
                  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face"
                }
                alt={developer.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-slate-800 shadow-2xl"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face";
                }}
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {developer.name}
                    </h1>
                    {isOwnProfile && (
                      <Badge variant="success" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        My Profile
                      </Badge>
                    )}
                  </div>
                  <p className="text-xl text-emerald-400 mb-3">
                    {developer.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-slate-300 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {developer.location}
                    </div>
                  </div>

                  {/* green alert if viewing own profile */}
                  {isOwnProfile && (
                    <div className="mt-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                      <p className="text-emerald-300 text-sm">
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        This is your profile. You can edit your information and
                        manage your settings.
                      </p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 min-w-fit">
                  {isOwnProfile ? (
                    // Own profile - show edit and settings buttons
                    // this will not be shown when isEditMode equal true
                    <>
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => setIsEditMode(!isEditMode)}
                      >
                        <Edit className="w-5 h-5 mr-2" />
                        {isEditMode ? "Cancel Edit" : "Edit Profile"}
                      </Button>
                    </>
                  ) : (
                    // Other developer's profile - show contact and save buttons
                    <>
                      <Button size="lg" className="w-full">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Contact Developer
                      </Button>
                      <Button variant="outline" size="lg" className="w-full">
                        <Heart className="w-5 h-5 mr-2" />
                        Save Profile
                      </Button>
                    </>
                  )}

                  <Button
                    onClick={handleShareProfile}
                    variant="ghost"
                    size="lg"
                    className="w-full"
                  >
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400" />
                Contact Info
              </h3>
              {isOwnProfile && (
                <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                  <p className="text-amber-300 text-sm">
                    <Shield className="w-4 h-4 inline mr-2" />
                    This contact information is visible to other developers and
                    potential clients.
                  </p>
                </div>
              )}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4" />
                  <span>sarah.johnson@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Globe className="w-4 h-4" />
                  <a
                    href={developer.socialLinks.portfolio}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    Portfolio
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex gap-3">
                  <a
                    href={developer.socialLinks.github}
                    className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href={developer.socialLinks.linkedin}
                    className="p-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </Card>

            {/* Education */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                Education
              </h3>
              <div className="text-slate-300">
                <p className="font-medium">{developer.education}</p>
              </div>
            </Card>

            {/* Languages */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Languages className="w-5 h-5 text-emerald-400" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {developer.languages.map((language) => (
                  <Badge key={language} variant="outline">
                    {language}
                  </Badge>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs */}
            <Card className="p-1">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                      activeTab === tab.id
                        ? "bg-emerald-500 text-white"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Tab Content */}
            <div className="min-h-96">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <Card className="p-6">
                    <h3 className="flex gap-2 items-center text-xl font-semibold text-white mb-4">
                      <Info />
                      About
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {developer.bio}
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="flex gap-2 items-center text-xl font-semibold text-white mb-4">
                      <Code />
                      Skills
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {developer.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-2 p-3 bg-slate-700/50 rounded-lg"
                        >
                          <Target className="w-4 h-4 text-emerald-400" />
                          <span className="text-slate-300">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setIsEditMode(!isEditMode)}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Project
                  </Button>
                  {developer.recentProjects.map((project) => (
                    <Card key={project.id} className="p-6">
                      <div className="flex flex-col lg:flex-row gap-6">
                        <img
                          src={
                            project.image ||
                            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop"
                          }
                          alt={project.title}
                          className="w-full lg:w-48 h-32 object-cover rounded-lg"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop";
                          }}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-semibold text-white">
                              {project.title}
                            </h3>
                            <Badge
                              variant={
                                project.status === "Completed"
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-slate-300 mb-4">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-slate-400">Budget:</span>
                              <p className="text-white font-semibold">
                                ${project.budget.toLocaleString()}
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-400">Duration:</span>
                              <p className="text-white font-semibold">
                                {project.duration}
                              </p>
                            </div>
                            <div>
                              <span className="text-slate-400">Client:</span>
                              <p className="text-white font-semibold">
                                {project.client}
                              </p>
                            </div>
                            {project.rating && (
                              <div>
                                <span className="text-slate-400">Rating:</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span className="text-white font-semibold">
                                    {project.rating}
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditMode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>
                <button
                  onClick={() => setIsEditMode(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Job Title
                  </label>
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Senior Full Stack Developer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm({ ...editForm, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., San Francisco, CA"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={editForm.longBio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, longBio: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Write a description of your experience and expertise..."
                />
              </div>

              {/* Skills */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  value={editForm.skills.join(", ")}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      skills: e.target.value
                        .split(", ")
                        .filter((skill) => skill.trim()),
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="React, Node.js, TypeScript, AWS..."
                />
              </div>

              {/* Specialties */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Specialties (comma-separated)
                </label>
                <input
                  type="text"
                  value={editForm.specialties.join(", ")}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      specialties: e.target.value
                        .split(", ")
                        .filter((specialty) => specialty.trim()),
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="E-commerce, SaaS, API Development..."
                />
              </div>

              {/* Social Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={editForm.socialLinks.github}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        socialLinks: {
                          ...editForm.socialLinks,
                          github: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={editForm.socialLinks.linkedin}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        socialLinks: {
                          ...editForm.socialLinks,
                          linkedin: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={editForm.socialLinks.portfolio}
                    onChange={(e) =>
                      setEditForm({
                        ...editForm,
                        socialLinks: {
                          ...editForm.socialLinks,
                          portfolio: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-700">
                <Button
                  variant="outline"
                  onClick={() => setIsEditMode(false)}
                  className="flex-1"
                  disabled={isSaving}
                >
                  Cancel
                </Button>
                {/* <Button
                  variant="success"
                  onClick={saveChanges}
                  className="flex-1"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Save Changes
                </Button> */}
                <Button
                  variant="success"
                  onClick={saveChanges}
                  className="flex-1"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperProfile;
