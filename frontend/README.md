# Modern Threads E-commerce

A full-stack e-commerce clothing website built with React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB.

## Project Overview

Modern Threads is a complete e-commerce solution for clothing sales with features like user authentication, product catalog, shopping cart, checkout process, and order management.

## Features

- User authentication (sign-up, sign-in)
- Product browsing with filtering and search
- Product details with image gallery
- Shopping cart functionality
- Checkout process
- Order history and tracking
- User profile management
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Framer Motion for animations
- React Hook Form for form handling
- Zod for form validation
- Axios for API requests
- Lucide icons
- React Hot Toast for notifications

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- CORS for cross-origin requests

## Deployment

### Frontend
- The frontend is configured for deployment on Vercel.

### Backend
- The backend is configured for deployment on Railway.

### Database
- MongoDB Atlas for database hosting.

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/modernthreads
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd backend
   npm install
   ```
3. Set up environment variables
4. Start the development servers:
   ```
   # Start frontend
   npm run dev

   # Start backend
   npm run start:backend
   ```
5. Seed the database with sample data:
   ```
   cd backend
   node seeder.js
   ```

## Project Structure

```
modern-threads/
├── backend/            # Backend code
│   ├── config/         # Database configuration
│   ├── controllers/    # Route controllers
│   ├── data/           # Seed data
│   ├── middleware/     # Express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility functions
│   └── server.js       # Express server entry point
├── src/                # Frontend code
│   ├── components/     # React components
│   ├── contexts/       # React contexts
│   ├── pages/          # Page components
│   ├── utils/          # Utility functions
│   └── types/          # TypeScript type definitions
└── ...                 # Root configuration files
```


