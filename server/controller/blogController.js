import BlogPost from '../models/blogModel.js';
// Get all blog posts
export const getBlogs = async (req, res) => {
    try {
        const blogs = await BlogPost.find()
        res.status(200).json(blogs)
    } catch (err) {
        res.status(401).json({
            error: err.message
        })
    }
}

// Create a blog 
export const postBlogs = async (req, res) => {
    const post = req.body
    const newPost = new BlogPost({...post,creator:req.userId,createdAt:new Date().toISOString()})
    try {
        await newPost.save()
        res.status(201).json(newPost)
        
    } catch (err) {
        res.status(409).json({
            error: err.message
        })
    }
}

// get a blog by id
export const getBlogById = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id)
        res.status(200).json(blog)
        
    } catch (err) {
        res.status(404).json({ message: "No blog found" })
    }
}
