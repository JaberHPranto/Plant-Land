import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
    name: { type: String, required: true },
    comment: { type: String, required: true },
    user:{ 
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },

}, {
    timestamps:true
})
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    creator: String,
    tags: [String],
    category:String,
    selectedFile: String,
    likes: {
        type: [String],
        default:[]
    },
    comments:[commentSchema],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const BlogPost = mongoose.model('Blog', blogSchema)

export default BlogPost