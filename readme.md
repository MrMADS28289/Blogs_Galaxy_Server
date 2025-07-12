# Blogs Galaxy Backend

This is the backend API for the Blogs Galaxy platform, providing robust functionalities for user authentication, blog post management, and comment interactions.

## Features

*   **User Authentication:** Secure user registration and login using JWT.
*   **Blog Management:** Create, read, update, and delete blog posts.
*   **Comment System:** Add and retrieve comments on blog posts.
*   **Database Integration:** Seamless data persistence with MongoDB.
*   **Error Handling:** Centralized error handling and validation.

## Technologies Used

*   **Node.js:** JavaScript runtime environment.
*   **Express.js:** Fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** NoSQL database for flexible data storage.
*   **Mongoose:** MongoDB object data modeling (ODM) for Node.js.
*   **bcryptjs:** Library for hashing passwords.
*   **jsonwebtoken:** For implementing JSON Web Tokens for authentication.
*   **dotenv:** To load environment variables from a `.env` file.
*   **cors:** Middleware for enabling Cross-Origin Resource Sharing.
*   **express-validator:** For server-side input validation.
*   **express-async-handler:** Simple middleware for handling exceptions inside of async express routes.

## Installation

To set up the project locally, follow these steps:

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
    In the root directory of the project, create a file named `.env` and add the following environment variables:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    Replace `your_mongodb_connection_string` with your MongoDB connection URI (e.g., from MongoDB Atlas or a local instance) and `your_jwt_secret_key` with a strong, random string for JWT signing.

## Usage

1.  **Start the development server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5000`.

## API Endpoints

The API provides the following main routes:

*   **`/api/auth`**: Handles user authentication (registration, login).
*   **`/api/blogs`**: Manages blog post operations (creation, retrieval, updates, deletion).
*   **`/api/comments`**: Manages comments on blog posts (adding, retrieving).

Detailed endpoint documentation (e.g., request/response formats) would typically be provided separately or generated using tools like Swagger/OpenAPI.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests.

## License

This project is licensed under the ISC License.
