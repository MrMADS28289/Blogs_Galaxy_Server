# Blogs Galaxy Backend

## Project Description

Blogs Galaxy is a robust backend application designed to power a dynamic blogging platform. It provides a comprehensive set of RESTful APIs for managing users, blog posts, comments, ratings, and administrative functionalities. Built with Node.js and Express, it emphasizes clean architecture, secure authentication, and efficient data handling.

## Features

- **User Management:** Secure user registration, login, and profile management.
- **Blog Post Management:** Create, read, update, and delete blog posts.
- **Commenting System:** Allow users to comment on blog posts.
- **Rating System:** Enable users to rate blog posts.
- **Admin Panel:** Dedicated routes for administrative tasks like managing users and content.
- **Authentication & Authorization:** JWT-based authentication and role-based authorization.
- **Error Handling:** Centralized error handling with custom error classes.
- **Database Integration:** Seamless integration with MongoDB (or your chosen database) via Mongoose.

## Installation

To set up the project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/blogs-galaxy-backend.git
    cd blogs-galaxy-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following environment variables:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    JWT_EXPIRE=1h
    ```
    *Replace `your_mongodb_connection_string` with your MongoDB connection URI.*
    *Replace `your_jwt_secret_key` with a strong, random string.*

4.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start on the port specified in your `.env` file (default: 5000).

## API Endpoints

Below is a summary of the main API endpoints. Detailed documentation can be found using tools like Postman or Swagger (if integrated).

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Log in a user and get a JWT token.
- `GET /api/auth/me`: Get current user's profile (requires authentication).

### Users
- `GET /api/users`: Get all users (admin only).
- `GET /api/users/:id`: Get a single user by ID (admin only).
- `PUT /api/users/:id`: Update user details (admin only).
- `DELETE /api/users/:id`: Delete a user (admin only).

### Blogs
- `GET /api/blogs`: Get all blog posts.
- `GET /api/blogs/:id`: Get a single blog post by ID.
- `POST /api/blogs`: Create a new blog post (requires authentication).
- `PUT /api/blogs/:id`: Update a blog post (requires authentication, author or admin).
- `DELETE /api/blogs/:id`: Delete a blog post (requires authentication, author or admin).

### Comments
- `GET /api/blogs/:blogId/comments`: Get comments for a specific blog post.
- `POST /api/blogs/:blogId/comments`: Add a comment to a blog post (requires authentication).
- `PUT /api/comments/:id`: Update a comment (requires authentication, comment author or admin).
- `DELETE /api/comments/:id`: Delete a comment (requires authentication, comment author or admin).

### Admin
- `GET /api/admin/dashboard`: Admin dashboard data (admin only).
- `PUT /api/admin/users/:id/role`: Update user role (admin only).

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- JSON Web Token (JWT) for authentication
- bcrypt.js for password hashing
- Joi (or similar) for validation (if implemented)

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.