# DevLink

> A full-stack platform that connects developers, showcases their work, and makes it easier to discover and communicate with other developers.

## Live Demo

- 🌐 **App:** [https://dev-link-frontend-mu.vercel.app](https://dev-link-frontend-mu.vercel.app/)
- 🔗 **API:** [https://dev-link-backend-opal.vercel.app](https://dev-link-backend-opal.vercel.app/)

## Overview

**DevLink** is a full-stack web application designed as a developer networking and discovery platform.

Developers can create profiles, showcase their projects and skills, discover other developers, and communicate through the platform.

The project was built to practice and demonstrate real-world full-stack development, including authentication, REST APIs, database design, frontend state management, file handling, and deployment.

## Features

- 🔐 User authentication and authorization
- 👤 Developer profiles
- 🛠️ Skills and technology management
- 📁 Project showcase
- 🔎 Developer discovery and search
- 💬 Developer messaging
- 🖼️ Profile and project images
- 🔒 HTTP-only cookie authentication
- 📱 Responsive user interface
- 🌐 RESTful backend API

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Context API
- Tailwind CSS
- Lucide React
- React Toastify

### Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- HTTP-only Cookies
- CORS

### Database

- MySQL

### Development & Deployment

- Git & GitHub
- Vercel
- Postman
- Linux

## Project Structure

```
DevLink/
│
├── devlink-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── assets/
│   │   └── ...
│   └── package.json
│
├── devlink-backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── ...
│
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- MySQL
- Git

### 1. Clone the repository

```
git clone https://github.com/takyEhab/DevLink.git
cd DevLink
```

### 2. Setup the Backend

```
cd devlink-backend
npm install
```

Create a `.env` file inside `devlink-backend`:

```
PORT=5000

FRONTEND_URL=http://localhost:5173

DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=devlink

JWT_SECRET=your_jwt_secret
```

Start the backend:

```
npm run dev
```

The API will be available at:

```
http://localhost:5000
```

### 3. Setup the Frontend

Open another terminal:

```
cd devlink-frontend
npm install
```

Start the development server:

```
npm run dev
```

The frontend will normally be available at:

```
http://localhost:5173
```

## Environment Variables

### Backend

| Variable       | Description                     |
| -------------- | ------------------------------- |
| `PORT`         | Port used by the Express server |
| `FRONTEND_URL` | URL allowed by CORS             |
| `DB_HOST`      | MySQL host                      |
| `DB_USER`      | MySQL username                  |
| `DB_PASSWORD`  | MySQL password                  |
| `DB_NAME`      | Database name                   |
| `JWT_SECRET`   | Secret used for authentication  |

> Never commit your `.env` file or expose your JWT secret or database credentials.

## API Structure

The backend follows a RESTful architecture.

Main API resources include:

```
/api/auth
/api/users
/api/profile
/api/projects
/api/messages
```

The API is responsible for authentication, user management, profiles, projects, and communication between developers.

## Authentication

DevLink uses token-based authentication with JWT.

Authentication tokens are stored using **HTTP-only cookies**, helping prevent client-side JavaScript from directly accessing authentication credentials.

Protected API routes use authentication middleware to verify the current user before allowing access to protected resources.

## Development

Run the frontend and backend separately during development.

### Frontend

```
cd devlink-frontend
npm run dev
```

### Backend

```
cd devlink-backend
npm run dev
```

Make sure your MySQL server is running before starting the backend.

## Deployment

The frontend and backend can be deployed as separate applications.

Recommended structure:

```
DevLink
│
├── Frontend → Vercel
│
└── Backend → Vercel
```

For production, update the backend environment variables with the production database credentials and frontend URL.

Example:

```
FRONTEND_URL=https://your-production-frontend.vercel.app
```

## Screenshots

Add screenshots of the main application here once the UI is finalized.

```
Home
Profile
Developer Search
Project Details
Messages
Authentication
```

## Future Improvements

Some features that can be added as the project evolves:

- [ ] Real-time messaging
- [ ] Notifications
- [ ] Advanced developer filtering
- [ ] Project categories
- [ ] Developer following system
- [ ] Profile verification
- [ ] Improved image management
- [ ] Better mobile experience
- [ ] Automated testing
- [ ] CI/CD pipeline

## What I Learned

Building DevLink provided practical experience with:

- Designing and consuming REST APIs
- Building a full-stack React application
- Authentication and authorization
- JWT and HTTP-only cookies
- MySQL database design
- Express.js backend architecture
- CORS configuration
- Frontend/backend communication
- Environment variable management
- Git and GitHub workflows
- Application deployment

## Author

**Taky Allah Ehab Gad**

Full-Stack Developer

- GitHub: [@takyEhab](https://github.com/takyEhab)
- LinkedIn: [Taky Allah Ehab Gad](https://www.linkedin.com/in/taky-gad/)

## License

This project is intended for educational and portfolio purposes.
