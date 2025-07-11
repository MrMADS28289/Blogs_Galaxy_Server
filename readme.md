# Blogs Galaxy Backend

This is the backend for the Blogs Galaxy application, built with Node.js, Express.js, and MongoDB. It provides RESTful APIs for user authentication and managing blog posts.

## Features

- User Authentication (Registration, Login, Google Sign-in)
- JWT-based Authorization
- CRUD operations for Blog Posts
- Commenting on Blog Posts
- Rating Blog Posts

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- bcryptjs (for password hashing)
- jsonwebtoken (for JWTs)
- dotenv (for environment variables)
- cors (for Cross-Origin Resource Sharing)

## Setup

Follow these steps to set up and run the backend locally:

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB (Community Server or MongoDB Atlas)

### Installation

1.  Navigate to the `blogs-galaxy-backend` directory:
    ```bash
    cd blogs-galaxy-backend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```

### Environment Variables

Create a `.env` file in the `blogs-galaxy-backend` directory with the following content:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

- `MONGO_URI`: Your MongoDB connection string (e.g., `mongodb://localhost:27017/blogs-galaxy` or your MongoDB Atlas connection string).
- `JWT_SECRET`: A strong, random string for signing JWTs.

### Running the Server

To start the backend server, run:

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user. (Public)
- `POST /api/auth/login`: Log in a user and get a JWT. (Public)
- `POST /api/auth/google`: Authenticate user with Google. (Public)

### Blog Posts

- `POST /api/blogs`: Create a new blog post. (Authenticated)
- `GET /api/blogs`: Get all blog posts. (Public)
- `GET /api/blogs/:id`: Get a single blog post by ID. (Public)
- `PUT /api/blogs/:id`: Update a blog post by ID. (Authenticated & Owner)
- `DELETE /api/blogs/:id`: Delete a blog post by ID. (Authenticated & Owner)
- `POST /api/blogs/:id/rate`: Rate a blog post. (Authenticated)

### Comments

- `POST /api/comments`: Create a new comment. (Authenticated)
- `GET /api/comments/blog/:blogId`: Get all comments for a specific blog. (Public)
- `PUT /api/comments/:id`: Update a comment by ID. (Authenticated & Owner)
- `DELETE /api/comments/:id`: Delete a comment by ID. (Authenticated & Owner)
