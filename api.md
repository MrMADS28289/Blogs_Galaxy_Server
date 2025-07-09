# Blogs Galaxy API Documentation

This document outlines the available API endpoints for the Blogs Galaxy backend.

## Authentication Routes (`/api/auth`)

*   **POST /api/auth/register**
    *   **Description**: Registers a new user.
    *   **Access**: Public
    *   **Request Body**:
        ```json
        {
            "username": "string",
            "email": "string (email format)",
            "password": "string"
        }
        ```
    *   **Response**: User object (or success message)

*   **POST /api/auth/login**
    *   **Description**: Logs in a user and returns an authentication token.
    *   **Access**: Public
    *   **Request Body**:
        ```json
        {
            "email": "string (email format)",
            "password": "string"
        }
        ```
    *   **Response**: Authentication token

## Blog Routes (`/api/blogs`)

*   **POST /api/blogs/**
    *   **Description**: Creates a new blog post.
    *   **Access**: Authenticated
    *   **Request Body**:
        ```json
        {
            "title": "string",
            "content": "string",
            "coverImage": "string (URL)",
            "category": "string",
            "tags": ["string"],
            "author": "string (User ID)"
        }
        ```
    *   **Response**: Newly created blog object

*   **GET /api/blogs/**
    *   **Description**: Retrieves all blog posts. Can be filtered by category.
    *   **Access**: Public
    *   **Query Parameters**:
        *   `category`: Optional. Filter blogs by a specific category name.
    *   **Response**: Array of blog objects

*   **GET /api/blogs/:id**
    *   **Description**: Retrieves a single blog post by its ID.
    *   **Access**: Public
    *   **Parameters**:
        *   `id`: The ID of the blog post.
    *   **Response**: Blog object

*   **PUT /api/blogs/:id**
    *   **Description**: Updates an existing blog post.
    *   **Access**: Authenticated & Owner
    *   **Parameters**:
        *   `id`: The ID of the blog post to update.
    *   **Request Body**: (Partial update, any of the blog fields)
        ```json
        {
            "title": "string (optional)",
            "content": "string (optional)",
            "coverImage": "string (URL, optional)",
            "category": "string (optional)",
            "tags": ["string"] (optional)
        }
        ```
    *   **Response**: Updated blog object

*   **DELETE /api/blogs/:id**
    *   **Description**: Deletes a blog post.
    *   **Access**: Authenticated & Owner
    *   **Parameters**:
        *   `id`: The ID of the blog post to delete.
    *   **Response**: Success message

*   **POST /api/blogs/:id/rate**
    *   **Description**: Rates a blog post.
    *   **Access**: Authenticated
    *   **Parameters**:
        *   `id`: The ID of the blog post to rate.
    *   **Request Body**:
        ```json
        {
            "rating": "number (e.g., 1-5)"
        }
        ```
    *   **Response**: Updated blog object with new rating

## Comment Routes (`/api/comments`)

*   **POST /api/comments/**
    *   **Description**: Creates a new comment.
    *   **Access**: Private (Authenticated)
    *   **Request Body**:
        ```json
        {
            "text": "string",
            "author": "string (User ID)",
            "blog": "string (Blog ID)"
        }
        ```
    *   **Response**: Newly created comment object

*   **GET /api/comments/blog/:blogId**
    *   **Description**: Retrieves all comments for a specific blog post.
    *   **Access**: Public
    *   **Parameters**:
        *   `blogId`: The ID of the blog post to retrieve comments for.
    *   **Response**: Array of comment objects

*   **PUT /api/comments/:id**
    *   **Description**: Updates an existing comment.
    *   **Access**: Private (Authenticated)
    *   **Parameters**:
        *   `id`: The ID of the comment to update.
    *   **Request Body**:
        ```json
        {
            "text": "string (optional)"
        }
        ```
    *   **Response**: Updated comment object

*   **DELETE /api/comments/:id**
    *   **Description**: Deletes a comment.
    *   **Access**: Private (Authenticated)
    *   **Parameters**:
        *   `id`: The ID of the comment to delete.
    *   **Response**: Success message
