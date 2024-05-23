# Blog Site Backend Integration Guide

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Configuration](#configuration)
- [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
  - [Blog API](#blog-api)
    - [Get All Blogs](#get-all-blogs)
    - [Get Blog List](#get-blog-list)
    - [Get Featured Blogs](#get-featured-blogs)
    - [Get Blogs by Category](#get-blogs-by-category)
    - [Get Blog Details](#get-blog-details)
    - [Create Blog](#create-blog)
    - [Update Blog](#update-blog)
    - [Delete Blog](#delete-blog)
  - [User API](#user-api)
    - [Register User](#register-user)
    - [Login User](#login-user)
    - [Get Current User](#get-current-user)
- [Integrating with Frontend](#integrating-with-frontend)

## Introduction

This guide provides instructions on how to set up and integrate the backend of the blog site into the frontend. It includes details on installing dependencies, starting the server, and using the API endpoints for CRUD operations.

## Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd blogSite/bsBackend
   ```

2. **Install Dependencies**

   Ensure you have Node.js and npm installed. Then, install the necessary dependencies:

   ```bash
   npm install
   ```

   I've included Sequelize as a dependency in the `package.json` file, so running `npm install` will install Sequelize along with all other project dependencies. But, to use Sequelize, you'd have to run a command in your terminal to initialize Sequelize.

## Configuration

1. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add the following environment variables:

   ```env
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name
   DB_HOST=your_db_host
   DB_DIALECT=mysql
   PORT=3000
   ACCESS_TOKEN_SECRET=your_secret_key
   ```

2. **Database Setup**

   Ensure you have a MySQL database running and create a database for the application. The name should match the `DB_NAME` variable in the `.env` file.

   To set up the database (create database and database tables), here are a series of commands you would run:

   ```bash
   npx sequelize-cli init        # Initialize Sequelize
   npx sequelize-cli db:create   # Create database (with the name specified in the .env file)
   npx sequelize-cli db:migrate  # Perform migrations (create all tables in the database)
   ```

## Starting the Server

To start the server, run:

```bash
npm run dev
```

This command uses `nodemon` to automatically restart the server on file changes. Alternatively, you can start the server without `nodemon` using:

```bash
npm run serve
```

## API Endpoints

### Blog API

#### Get All Blogs

**Endpoint**: `GET /blogs`

**Description**: Fetches all blogs with user and category details.

**Response**:
```json
[
  {
    "blog_id": 1,
    "title": "Blog Title",
    "summary": "Brief summary",
    "content": "Full content",
    "User": {
      "username": "authorUsername"
    },
    "Categories": [
      {
        "name": "CategoryName"
      }
    ]
  },
  ...
]
```

#### Get Blog List

**Endpoint**: `GET /blogs/blog-list`

**Description**: Fetches a list of blogs with only ID, title, brief summary, and the username of the blog creator.

**Response**:
```json
[
  {
    "blog_id": 1,
    "title": "Blog Title",
    "summary": "Brief summary",
    "User": {
      "username": "authorUsername"
    }
  },
  ...
]
```

#### Get Featured Blogs

**Endpoint**: `GET /blogs/featured`

**Description**: Fetches all featured blogs.

**Response**:
```json
[
  {
    "blog_id": 1,
    "title": "Featured Blog Title",
    "summary": "Brief summary",
    "content": "Full content",
    "is_featured": true,
    "User": {
      "username": "authorUsername"
    },
    "Categories": [
      {
        "name": "CategoryName"
      }
    ]
  },
  ...
]
```

#### Get Blogs by Category

**Endpoint**: `GET /blogs/category/:categoryId`

**Description**: Fetches blogs that belong to a specified category ID.

**Response**:
```json
[
  {
    "blog_id": 1,
    "title": "Blog Title",
    "summary": "Brief summary",
    "content": "Full content",
    "User": {
      "username": "authorUsername"
    },
    "Categories": [
      {
        "name": "CategoryName"
      }
    ]
  },
  ...
]
```

#### Get Blog Details

**Endpoint**: `GET /blogs/:blogId`

**Description**: Fetches details of a blog by its ID.

**Response**:
```json
{
  "blog_id": 1,
  "title": "Blog Title",
  "summary": "Brief summary",
  "content": "Full content",
  "User": {
    "username": "authorUsername"
  },
  "Categories": [
    {
      "name": "CategoryName"
    }
  ]
}
```

#### Create Blog

**Endpoint**: `POST /blogs/create`

**Description**: Creates a new blog.

**Request Body**:
```json
{
  "user_id": 1,
  "title": "New Blog Title",
  "content": "Full content",
  "summary": "Brief summary",
  "category_ids": [1, 2]
}
```

**Response**:
```json
{
  "blog_id": 2,
  "user_id": 1,
  "title": "New Blog Title",
  "content": "Full content",
  "summary": "Brief summary"
}
```

#### Update Blog

**Endpoint**: `PUT /blogs/update/:blogId`

**Description**: Updates an existing blog by its ID.

**Request Body**:
```json
{
  "title": "Updated Blog Title",
  "content": "Updated content",
  "summary": "Updated summary",
  "is_featured": true,
  "category_ids": [1, 3]
}
```

**Response**:
```json
{
  "blog_id": 2,
  "title": "Updated Blog Title",
  "content": "Updated content",
  "summary": "Updated summary",
  "is_featured": true,
  "User": {
    "username": "authorUsername"
  },
  "Categories": [
    {
      "name": "UpdatedCategoryName"
    }
  ]
}
```

#### Delete Blog

**Endpoint**: `DELETE /blogs/:blogId`

**Description**: Deletes a blog by its ID.

**Response**:
```json
{
  "message": "Blog deleted successfully"
}
```

### User API

#### Register User

**Endpoint**: `POST /users/register`

**Description**: Registers a new user.

**Request Body**:
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "_id": 1,
  "email": "johndoe@example.com"
}
```

#### Login User

**Endpoint**: `POST /users/login`

**Description**: Logs in a user and returns an access token.

**Request Body**:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "accessToken": "jwt-token"
}
```

#### Get Current User

**Endpoint**: `GET /users/current`

**Description**: Fetches the current logged-in user's details. Requires a valid access token.

**Headers**:
```json
{
  "Authorization": "Bearer jwt-token"
}
```

**Response**:
```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "id": 1
}
```

## Integrating with Frontend

To integrate the backend with your frontend application, follow these steps:

1. **Set Up API Base URL**

   In your frontend application, set up a base URL for API requests. For example, in a React application, you might use an environment variable:

   ```javascript
   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';
   ```

2. **Install Axios**

   If you're using Axios for making HTTP requests, install it in your frontend project:

   ```bash
   npm install axios
   ```

3. **Create API Service**

   Create a service file to handle API requests. For example, in a React application:

   ```javascript
   import axios from 'axios';

   const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

   const api = axios.create({
     baseURL: API_BASE_URL,
   });

   export const registerUser = (userData) => api.post('/users/register', userData);
   export const loginUser = (userData) => api.post('/users/login', userData);
   export const getCurrentUser = (token) => api.get('/users/current', {
     headers: {
       Authorization: `Bearer ${token}`
     }
   });
   export const getAllBlogs = () => api.get('/blogs');
   export const createBlog = (blogData) => api.post('/blogs/create', blogData);
   // Add other API methods as needed
   ```

4. **Handle Authentication**

   In your frontend application, store the access token upon successful login and include it in the headers for authenticated requests.

5. **Display Blog Data**

   Fetch and display blog data in your components. For example, in a React component:

   ```javascript
   import React, { useState, useEffect } from 'react';
   import { getAllBlogs } from './api';

   const BlogList = () => {
     const [blogs, setBlogs] = useState([]);

     useEffect(() => {
       const fetchBlogs = async () => {
         const blogData = await getAllBlogs();
         setBlogs(blogData.data);
       };

       fetchBlogs();
     }, []);

     return (
       <div>
         <h1>Blog List</h1>
         <ul>
           {blogs.map(blog => (
             <li key={blog.blog_id}>{blog.title}</li>
           ))}
         </ul>
       </div>
     );
   };

   export default BlogList;
   ```

By following these steps, you can successfully integrate the backend of the blog site with your frontend application, allowing you to perform CRUD operations and display blog data to users.