import BlogPost from '../models/blogModel.js';
// Get all blog posts
export const getBlogs = (req, res) => {
    res.send("Everything works !!!")
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
