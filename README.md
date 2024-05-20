# Blog Site Backend Integration Guide

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Configuration](#configuration)
- [Starting the Server](#starting-the-server)
- [API Endpoints](#api-endpoints)
  - [Get All Blogs](#get-all-blogs)
  - [Get Blog List](#get-blog-list)
  - [Get Featured Blogs](#get-featured-blogs)
  - [Get Blogs by Category](#get-blogs-by-category)
  - [Get Blog Details](#get-blog-details)
  - [Create Blog](#create-blog)
  - [Update Blog](#update-blog)
  - [Delete Blog](#delete-blog)
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
   ```

2. **Database Setup**

   Ensure you have a MySQL database running and create a database for the application. The name should match the `DB_NAME` variable in the `.env` file.

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

### Get All Blogs

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

### Get Blog List

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

### Get Featured Blogs

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

### Get Blogs by Category

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

### Get Blog Details

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

### Create Blog

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

### Update Blog

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

### Delete Blog

**Endpoint**: `DELETE /blogs/:blogId`

**Description**: Deletes a blog by its ID.

**Response**:
```json
{
  "message": "Blog deleted successfully"
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

   export const getAllBlogs = async () => {
     const response = await api.get('/blogs');
     return response.data;
   };

   export const getBlogList = async () => {
     const response = await api.get('/blogs/blog-list');
     return response.data;
   };

   export const getFeaturedBlogs = async () => {
     const response = await api.get('/blogs/featured');
     return response.data;
   };

   export const getBlogsByCategory = async (categoryId) => {
     const response = await api.get(`/blogs/category/${categoryId}`);
     return response.data;
   };

   export const getBlogDetails = async (blogId) => {
     const response = await api.get(`/blogs/${blogId}`);
     return response.data;
   };

   export const createBlog = async (blogData) => {
     const response = await api.post('/blogs/create', blogData);
     return response.data;
   };

   export const updateBlog = async (blogId, blogData) => {
     const response = await api.put(`/blogs/update/${blogId}`, blogData);
     return response.data;
   };

   export const deleteBlog = async (blogId) => {
     await api.delete(`/blogs/${blogId}`);
   };
   ```

4. **Use API Service in Components**

   Use the API service functions in your frontend components to fetch and manipulate blog data. For example, in a React component:

   ```javascript
   import React, { useEffect, useState } from 'react';
   import { getAllBlogs } from './api';

   const BlogList = () => {
     const [blogs, setBlogs] = useState([]);

     useEffect(() => {
       const fetchBlogs = async () => {
         const blogData = await getAllBlogs();
         setBlogs(blogData);
       };

       fetchBlogs();
     }, []);

     return (
       <div>
         {blogs.map(blog => (
           <div key={blog.blog_id}>
             <h2>{blog.title}</h2>
             <p>{blog.summary}</p>
             <p>Author: {blog.User.username}</p>
           </div>
        

 ))}
       </div>
     );
   };

   export default BlogList;
   ```

By following these instructions, you can seamlessly integrate the backend API with the frontend application, allowing you to perform CRUD operations and display blog data dynamically.