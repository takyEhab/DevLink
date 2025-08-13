"use client"

import { useState, useRef, useEffect } from "react"
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Search,
  ArrowLeft,
  Image,
  File,
  Check,
  CheckCheck,
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

const Input = ({ className = "", ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    {...props}
  />
)

const Badge = ({ children, variant = "default", className = "", ...props }) => {
  const variants = {
    default: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

// Sample chat data
const chatData = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    role: "Project Manager",
    company: "TechCorp Inc.",
    lastMessage: "Thanks for the proposal! When can we schedule a call?",
    timestamp: "2 min ago",
    unread: 2,
    online: true,
    messages: [
      {
        id: 1,
        sender: "other",
        content: "Hi! I saw your profile and I'm interested in discussing a React project with you.",
        timestamp: "10:30 AM",
        status: "read",
      },
      {
        id: 2,
        sender: "me",
        content: "Hello Sarah! I'd be happy to discuss your project. Could you tell me more about the requirements?",
        timestamp: "10:32 AM",
        status: "read",
      },
      {
        id: 3,
        sender: "other",
        content:
          "We're building a dashboard for our internal team. It needs to handle real-time data visualization and user management. The tech stack should include React, Node.js, and PostgreSQL.",
        timestamp: "10:35 AM",
        status: "read",
      },
      {
        id: 4,
        sender: "me",
        content:
          "That sounds like a great project! I have extensive experience with that exact tech stack. I can provide a detailed proposal with timeline and cost estimates. What's your expected timeline?",
        timestamp: "10:40 AM",
        status: "read",
      },
      {
        id: 5,
        sender: "other",
        content: "We're looking to have this completed within 8-10 weeks. Budget is flexible for the right developer.",
        timestamp: "10:45 AM",
        status: "read",
      },
      {
        id: 6,
        sender: "me",
        content:
          "Perfect! That timeline works well for me. I'll prepare a comprehensive proposal including project phases, deliverables, and pricing. I can have it ready by tomorrow morning.",
        timestamp: "11:00 AM",
        status: "delivered",
      },
      {
        id: 7,
        sender: "other",
        content: "Thanks for the proposal! When can we schedule a call?",
        timestamp: "2:15 PM",
        status: "read",
      },
    ],
  },
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    role: "Startup Founder",
    company: "InnovateLab",
    lastMessage: "The mobile app mockups look great!",
    timestamp: "1 hour ago",
    unread: 0,
    online: false,
    messages: [
      {
        id: 1,
        sender: "other",
        content: "Hey! I need help with a React Native app. Are you available for a quick project?",
        timestamp: "Yesterday",
        status: "read",
      },
      {
        id: 2,
        sender: "me",
        content: "Hi Mike! Yes, I'm available. What kind of app are you looking to build?",
        timestamp: "Yesterday",
        status: "read",
      },
      {
        id: 3,
        sender: "other",
        content: "The mobile app mockups look great!",
        timestamp: "1:30 PM",
        status: "read",
      },
    ],
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
    role: "CTO",
    company: "DataFlow Systems",
    lastMessage: "Can you start next Monday?",
    timestamp: "3 hours ago",
    unread: 1,
    online: true,
    messages: [
      {
        id: 1,
        sender: "other",
        content: "We need a senior developer for our backend team. Interested?",
        timestamp: "11:00 AM",
        status: "read",
      },
      {
        id: 2,
        sender: "me",
        content: "Definitely interested! Could you share more details about the role?",
        timestamp: "11:15 AM",
        status: "read",
      },
      {
        id: 3,
        sender: "other",
        content: "Can you start next Monday?",
        timestamp: "12:30 PM",
        status: "delivered",
      },
    ],
  },
]

// Chat List Component
const ChatList = ({ chats, selectedChat, onSelectChat, onBack }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.company.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full lg:w-80 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={onBack} className="lg:hidden">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h2 className="text-xl font-semibold text-white">Messages</h2>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`p-4 border-b border-gray-700 cursor-pointer transition-colors hover:bg-gray-700 ${
              selectedChat?.id === chat.id ? "bg-gray-700" : ""
            }`}
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="relative">
                <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-12 h-12 rounded-full" />
                {chat.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-400">{chat.timestamp}</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">
                  {chat.role} at {chat.company}
                </p>
                <p className="text-sm text-gray-300 truncate">{chat.lastMessage}</p>
              </div>

              {/* Unread Badge */}
              {chat.unread > 0 && (
                <Badge variant="default" className="bg-blue-600 text-white min-w-[20px] h-5 text-xs">
                  {chat.unread}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Message Component
const Message = ({ message, isMe }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-400" />
      default:
        return null
    }
  }

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isMe ? "order-2" : "order-1"}`}>
        <div
          className={`px-4 py-2 rounded-lg ${
            isMe ? "bg-blue-600 text-white rounded-br-sm" : "bg-gray-700 text-white rounded-bl-sm"
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        <div className={`flex items-center mt-1 space-x-1 ${isMe ? "justify-end" : "justify-start"}`}>
          <span className="text-xs text-gray-400">{message.timestamp}</span>
          {isMe && getStatusIcon(message.status)}
        </div>
      </div>
    </div>
  )
}

// Chat Window Component
const ChatWindow = ({ chat, onBack }) => {
  const [newMessage, setNewMessage] = useState("")
  const [showAttachments, setShowAttachments] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chat?.messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No conversation selected</h3>
          <p className="text-gray-400">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" onClick={onBack} className="lg:hidden">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="relative">
              <img src={chat.avatar || "/placeholder.svg"} alt={chat.name} className="w-10 h-10 rounded-full" />
              {chat.online && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-gray-800 rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-white">{chat.name}</h3>
              <p className="text-xs text-gray-400">
                {chat.role} at {chat.company}
                {chat.online && " • Online"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => (
          <Message key={message.id} message={message} isMe={message.sender === "me"} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Attachment Menu */}
      {showAttachments && (
        <div className="px-4 py-2 border-t border-gray-700 bg-gray-800">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <Image className="w-6 h-6 mb-1" />
              <span className="text-xs">Photo</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex-col h-auto py-2">
              <File className="w-6 h-6 mb-1" />
              <span className="text-xs">Document</span>
            </Button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <form onSubmit={handleSendMessage} className="flex items-end space-x-2">
          <div className="flex-1">
            <div className="flex items-center space-x-2 bg-gray-700 rounded-lg px-3 py-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowAttachments(!showAttachments)}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              />
              <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button type="submit" size="icon" disabled={!newMessage.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

// Main Chat UI Component
const ChatUI = ({ onBack }) => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [showChatList, setShowChatList] = useState(true)

  const handleSelectChat = (chat) => {
    setSelectedChat(chat)
    setShowChatList(false) // Hide chat list on mobile when chat is selected
  }

  const handleBackToList = () => {
    setShowChatList(true)
    setSelectedChat(null)
  }

  return (
    <div className="h-screen bg-gray-900 flex">
      {/* Chat List - Always visible on desktop, conditional on mobile */}
      <div className={`${showChatList ? "block" : "hidden"} lg:block`}>
        <ChatList chats={chatData} selectedChat={selectedChat} onSelectChat={handleSelectChat} onBack={onBack} />
      </div>

      {/* Chat Window - Always visible on desktop, conditional on mobile */}
      <div className={`${!showChatList ? "block" : "hidden"} lg:block flex-1`}>
        <ChatWindow chat={selectedChat} onBack={handleBackToList} />
      </div>
    </div>
  )
}

export default ChatUI
