# Blogs Galaxy Backend

This is the backend for the Blogs Galaxy application, built with Node.js, Express, and MongoDB. It provides RESTful APIs for user authentication, blog management, and blog rating.

## Technologies Used

- Node.js
- Express.js
- MongoDB (via Mongoose)
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)
- dotenv (for environment variables)
- cors (for Cross-Origin Resource Sharing)

## Setup Instructions

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd blogs-galaxy-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory of the project and add the following environment variables:
    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., `mongodb://localhost:27017/blogs-galaxy` or a MongoDB Atlas URI) and `your_jwt_secret_key` with a strong, random string.

4.  **Run the server:**
    ```bash
    npm start
    ```
    The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication

-   **`POST /api/auth/register`**
    -   Registers a new user.
    -   **Request Body:** `{ "name": "string", "email": "string", "password": "string" }`
    -   **Response:** `{ "token": "string" }`

-   **`POST /api/auth/login`**
    -   Logs in an existing user.
    -   **Request Body:** `{ "email": "string", "password": "string" }`
    -   **Response:** `{ "token": "string" }`

### Blogs

-   **`POST /api/blogs`** (Authenticated)
    -   Creates a new blog post.
    -   **Request Body:** `{ "title": "string", "content": "string" }`
    -   **Response:** `{ "_id": "string", "title": "string", "content": "string", "author": "string", ... }`

-   **`GET /api/blogs`** (Public)
    -   Retrieves all blog posts.
    -   **Response:** `[ { ...blog_object }, ... ]`

-   **`GET /api/blogs/:id`** (Public)
    -   Retrieves a single blog post by ID.
    -   **Response:** `{ ...blog_object }`

-   **`PUT /api/blogs/:id`** (Authenticated & Owner)
    -   Updates an existing blog post by ID.
    -   **Request Body:** `{ "title": "string", "content": "string" }` (partial updates allowed)
    -   **Response:** `{ ...updated_blog_object }`

-   **`DELETE /api/blogs/:id`** (Authenticated & Owner)
    -   Deletes a blog post by ID.
    -   **Response:** `{ "message": "Blog deleted" }`

-   **`POST /api/blogs/:id/rate`** (Authenticated)
    -   Rates a blog post.
    -   **Request Body:** `{ "stars": "number" }` (1-5)
    -   **Response:** `{ ...updated_blog_object_with_ratings }`
