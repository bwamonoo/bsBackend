const { Blog, User, Category, Comment, BlogCategory } = require('../models');
// blog_index, blog_details, blog_create_get, blog_create_post, blog_delete


//@desc Get all blogs
//@route GET /blogs/
//@access public
const blog_index = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        { model: User, attributes: ['username'] },
        { model: Category, attributes: ['name'] }
      ]
    });
    res.json(blogs);
  } catch (error) {
    res.status(500);
    next();
  }
};


//desc Get blog list

const blog_list = async (req, res, next) => {
  try {
    // Fetch all blogs with specific attributes
    const blogs = await Blog.findAll({
      attributes: ['blog_id', 'title', 'summary'],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Send the list of blogs
    res.json(blogs);
  } catch (error) {
    res.status(500);
    next();
  }
}



const blog_featured = async (req, res, next) => {
  try {
    // Fetch featured blogs
    const featuredBlogs = await Blog.findAll({
      where: { is_featured: true },
      include: [
        { model: User, attributes: ['username'] },
        { model: Category, attributes: ['name'] },
      ],
    });

    // If no featured blogs found, send a 404 response
    if (!featuredBlogs.length) {
      return res.status(404).json({ error: 'No featured blogs found' });
    }

    // Send the list of featured blogs
    res.json(featuredBlogs);
  } catch (error) {
    res.status(500);
    next()
  }
}



const blog_category = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    // Fetch blogs that belong to the given category ID
    const blogs = await Blog.findAll({
      include: [
        {
          model: Category,
          where: { category_id: categoryId },
          attributes: ['name'],
        },
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // If no blogs found, send a 404 response
    if (!blogs.length) {
      return res.status(404).json({ error: 'No blogs found for this category' });
    }

    // Send the list of blogs
    res.json(blogs);
  } catch (error) {
    res.status(500);
    next();
  }
}

const get_single_blog = async (req, res, next) => {
  const blogId = req.params.blogId;

  try {
    // Fetch the blog by its ID
    const blog = await Blog.findOne({
      where: { blog_id: blogId },
      include: [
        { model: User, attributes: ['username'] },
        { model: Category, attributes: ['name'] },
      ],
    });

    // If the blog is not found, send a 404 response
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Send the blog details
    res.json(blog);
  } catch (error) {
    res.status(500);
    next();
  }
}



const blog_details = (req, res, next) => {
  get_single_blog(req, res, next);
}



const blog_create_post = async (req, res, next) => {
  try {
    const { user_id, title, content, summary, category_ids } = req.body;

    if (!title && !content && !summary) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }

    const blog = await Blog.create({ user_id, title, content, summary });

    if (category_ids && category_ids.length > 0) {
      const categories = await Category.findAll({
        where: { category_id: category_ids }
      });
      await blog.setCategories(categories);
    }

    res.status(201).json(blog);
  } catch (error) {
    res.status(500);
    next();
  }
}



const blog_update_get = (req, res, next) => {
  get_single_blog(req, res, next);
}



const blog_update_post = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, content, summary, is_featured, category_ids } = req.body;

  try {
    // Find the blog by ID
    const blog = await Blog.findByPk(blogId);

    // If blog not found, send a 404 response
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    // Update blog fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.summary = summary || blog.summary;
    blog.is_featured = is_featured !== undefined ? is_featured : blog.is_featured;

    // Save the updated blog
    await blog.save();

    // If category_ids are provided, update the categories
    if (category_ids && category_ids.length > 0) {
      const categories = await Category.findAll({
        where: { category_id: category_ids }
      });
      await blog.setCategories(categories);
    }

    // Respond with the updated blog
    const updatedBlog = await Blog.findByPk(blogId, {
      include: [
        { model: Category, attributes: ['name'] }
      ]
    });

    res.json(updatedBlog);
  } catch (error) {
    res.status(500);
    next();
  }
}



const blog_delete = async (req, res, next) => {
    const blogId = req.params.blogId;
  
    try {
      // Find the blog by ID
      const blog = await Blog.findByPk(blogId);
  
      // If blog not found, send a 404 response
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      // Delete associated comments
      await Comment.destroy({
        where: {
          blog_id: blogId
        }
      });
  
      // Delete associated blog categories
      await BlogCategory.destroy({
        where: {
          blog_id: blogId
        }
      });
  
      // Delete the blog
      await blog.destroy();
  
      // Send a success response
      res.status(204).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500);
      next();
    }
  }



module.exports = {
  blog_index,
  blog_list,
  blog_featured,
  blog_category,
  blog_details,
  blog_create_post,
  blog_update_get,
  blog_update_post,
  blog_delete
};