import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createBlog } from '../../redux/actions/blogActions'
import { toastSuccessMessage } from '../Ecommerce/ToastMessage'
import BlogDropdown from './BlogCategory'

function NewBlog() {
    const history = useHistory()
    const dispatch = useDispatch()

    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState("")
    const [image, setImage] = useState("")
    const [content, setContent] = useState("")


    const onCategorySelect = (category) => {
        setCategory(category)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log("off")
        const allTags = tags.split(",")
        const blogPost = {
            title,description:content,category,tags:allTags,image
        }
        try {
            dispatch(createBlog(blogPost))
            clearInputs()
            toastSuccessMessage("Blog Published")
        } catch (err) {
            console.log(err);
        }

    }

    const handleFileUpload = async (e) => {
        const file = e.target.files[0]     
        const formData = new FormData()
        formData.append('image', file)

        try {
        const config = {
            headers: {
            'Content-Type':'multipart/form-data'
            }
        }
        const { data } = await axios.post(`/api/uploads`, formData, config)
        setImage(data)
        } catch (error) {
        console.log(error)
    }
    }
    
    const clearInputs = () => {
        setTitle("")
        setContent("")
        setTags("")
        setCategory("")
        setImage("")
    }

    return (
        <div className="write">
            {image ? <img className="writeImage" src={image} alt="blog hero"/> : (           
                <img className="writeImage"
                    src="https://images.pexels.com/photos/9513908/pexels-photo-9513908.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                    alt="blog hero"
                />
            ) }
            <form className="writeForm" onSubmit={handleFormSubmit} >
                <div className="writeFormGroup">
                    <label htmlFor="blogImage"><i className="writeIcon fas fa-plus"></i></label>
                    <input type="file" name="blogImage" id="blogImage" style={{ display: 'none' }} onChange={handleFileUpload} />
                    <input type="text" name="title" id="title" placeholder="Title" autoFocus={true} className="writeInput writeTitle" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className="writeCategory">
                    <BlogDropdown onCategorySelect={onCategorySelect}/>
                </div>
                <div className="writeFormGroup">
                    <input type="text" name="tags" id="tags" className="writeInput writeTags" placeholder="Add tags, separated by comma..." value={tags} onChange={(e)=>setTags(e.target.value)}/>
                </div>
                {/* <div className="writeFormGroup">
                    <textarea name="desc" id="desc" cols="60" rows="10" placeholder="Write about plants..." className="writeInput writeText" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div> */}

                {/* Editor */}
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    config={{ckfinder:{uploadUrl:`http://localhost:5000/api/uploads/ck-image`}}}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log(data);
                        setContent(data)
                    } }
                />

                
                <Button type='submit' className="writeSubmit bg-col-primary">Publish</Button>
            </form>
            <Button className='blogBack' onClick={()=>history.push("/blog")} >Back</Button>
        </div>
    )
}

export default NewBlog
