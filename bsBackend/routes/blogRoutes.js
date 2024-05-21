const express = require('express');
const router = express.Router();
const asyncHandler = require('../middleware/asyncHandler.js');
const validateToken = require('../middleware/validateTokenHandler.js');
const blogHandler = require('../controllers/blog.js');


// Routes to get blogs
router.get('/', asyncHandler(blogHandler.blog_index));
router.get('/blog-list', asyncHandler(blogHandler.blog_list));
router.get('/featured', asyncHandler(blogHandler.blog_featured));
router.get('/category/:categoryId', asyncHandler(blogHandler.blog_category));
router.get('/blog/:blogId', asyncHandler(blogHandler.blog_details));

// Routes to manage logged-in user blogs
router.use(validateToken);
router.get('/user', asyncHandler(blogHandler.blog_user));
router.get('/create', asyncHandler(blogHandler.blog_create_get));
router.post('/create', asyncHandler(blogHandler.blog_create_post));
router.get('/update/:blogId', asyncHandler(blogHandler.blog_update_get));
router.put('/update/:blogId', asyncHandler(blogHandler.blog_update_put));

// Route to delete a blog
router.delete('/delete/:blogId', asyncHandler(blogHandler.blog_delete));

module.exports = router;
