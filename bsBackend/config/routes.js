const express = require('express');
const router = express.Router();
const blogHandler = require('../controllers/blog.js')


// Routes to get blogs
router.get('/', blogHandler.blog_index);
router.get('/blog-list', blogHandler.blog_list);
router.get('/featured', blogHandler.blog_featured);
router.get('/category/:categoryId', blogHandler.blog_category);
router.get('/:blogId', blogHandler.blog_details);

// Routes to create/update a blog by Id
router.post('/create', blogHandler.blog_create_post);
router.get('/update/:blogId', blogHandler.blog_update_get);
router.put('/update/:blogId', blogHandler.blog_update_post);

// Routes to delete a blog
router.delete('/:blogId', blogHandler.blog_delete);

module.exports = router;
