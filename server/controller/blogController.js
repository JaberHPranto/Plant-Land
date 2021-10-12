// import fs from 'fs';
import BlogPost from '../models/blogModel.js';
import User from '../models/userModel.js';
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
        console.log(err);
        res.status(409).json({
            error: err.message
        })
    }
}

// get a blog by id
export const getBlogById = async (req, res) => {
    try {
        const blog = await BlogPost.findById(req.params.id)
        const blogCreator = await User.findById(blog.creator)
        blog.author = blogCreator.name
        res.status(200).json(blog)
        
    } catch (err) {
        res.status(404).json({ message: "No blog found" })
    }
}


// test
// export const test = (req, res) => {
//     const {file }  = req.body
//     // const files = ['photo1.jpg', 'photo2.jpg'];
//     // const base64files = fs.readFileSync(file, "base64")
//     console.log(file);
//     const arr = []
//     // const k = Object.keys(file)
//     // const v = Object.values(file)
//     // console.log(typeof(k));
//     // console.log(v);
//     // const fst = String(file)
    
//     // const t = k[0].replace("data:image/jpeg;base64,","")
//     // console.log(typeof(arr));
//     arr.push(file)
//     // arr.push(k[0])
//     // console.log(typeof(file));
//     const data = {
//     api_key: "Bxj3gYFWqAJpIqan2CenvlqFUr3XepY4nBW0z2lKhX3kKVpnfY",
//     images:arr,
//     modifiers: ["crops_fast", "similar_images"],
//     plant_language: "en",
//     plant_details: ["common_names",
//         "url",
//         "name_authority",
//         "wiki_description",
//         "taxonomy",
//         "synonyms"]
// };
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json',

//                 // api_key: "Bxj3gYFWqAJpIqan2CenvlqFUr3XepY4nBW0z2lKhX3kKVpnfY",
//             }
//         }
// axios.post('https://api.plant.id/v2/identify', data,config).then(res => {
//     console.log('Success:',res.data);
// }).catch(error => {
//     console.error('Error: ')
// })
// }