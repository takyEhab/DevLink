import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

// Simple UI Components
const Button = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline:
      "border border-gray-600 bg-transparent text-white hover:bg-gray-700",
    ghost: "text-gray-300 hover:bg-gray-700 hover:text-white",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    lg: "h-12 px-6 py-3 text-base",
    sm: "h-8 px-3 py-1 text-xs",
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

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
);

// Dropdown Menu Component
const DropdownMenu = ({ trigger, children, isOpen, onToggle }) => {
  return (
    <div className="relative">
      <button onClick={onToggle} className="flex items-center">
        {trigger}
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="py-1">{children}</div>
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors flex items-center ${className}`}
  >
    {children}
  </button>
);

const Header = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationCount] = useState(5); // Mock notification count
  const { user, apiLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleUserMenuToggle = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  const handleProfileClick = () => {
    setUserMenuOpen(false);
    navigate(`/profile/${user.name}`);
  };

  const handleLogoutClick = async () => {
    setUserMenuOpen(false);
    await apiLogout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800/95 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">DC</span>
                </div>
                <h1 className="text-2xl font-bold text-white">DevConnect</h1>
              </div>
            </Link>

            {/* Navigation Links - Only show when logged in */}
            {user && (
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  to="/find-dev"
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Developers
                </Link>

                <Link
                  to="/messages"
                  className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
                >
                  Messages
                </Link>
              </nav>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Search Bar - Compact */}
                <div className="hidden lg:flex relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search developers..."
                    className="pl-10 w-64 h-9 text-sm bg-gray-700/50 border-gray-600/50 focus:bg-gray-700"
                  />
                </div>

                {/* Notifications */}
                <div className="relative">
                  <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="w-5 h-5" />
                    {notificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </Button>
                </div>

                {/* User Menu */}
                <DropdownMenu
                  isOpen={userMenuOpen}
                  onToggle={handleUserMenuToggle}
                  trigger={
                    <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-gray-600"
                      />
                      <div className="hidden sm:block text-left">
                        <div className="text-sm font-medium text-white">
                          {user.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {user.title}
                        </div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </div>
                  }
                >
                  <div className="px-4 py-3 border-b border-gray-700">
                    <div className="text-sm font-medium text-white">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                  <DropdownItem onClick={handleProfileClick}>
                    <User className="w-4 h-4 mr-3" />
                    My Profile
                  </DropdownItem>

                  <div className="border-t border-gray-700 mt-1 pt-1">
                    <DropdownItem
                      onClick={handleLogoutClick}
                      className="text-red-400 hover:text-red-300"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </DropdownItem>
                  </div>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <Button>Sign In</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
