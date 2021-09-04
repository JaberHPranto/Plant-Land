import React from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import BlogDropdown from './BlogCategory'

function NewBlog() {
    const history = useHistory()
    function backToBlog() {
        history.push("/blog")
    }
    return (
        <div className="write">
            <img className="writeImage"
                src="https://images.unsplash.com/photo-1620118218439-a23223a4d223?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                alt="blog hero"
            />
            <form className="writeForm">
                <div className="writeFormGroup">
                    <label htmlFor="blogImage"><i className="writeIcon fas fa-plus"></i></label>
                    <input type="file" name="blogImage" id="blogImage" style={{display:'none'}} />
                    <input type="text" name="title" id="title" placeholder="Title" autoFocus={true} className="writeInput writeTitle"/>
                </div>
                <div className="writeCategory">
                    <BlogDropdown />
                </div>
                <div className="writeFormGroup">
                    <input type="text" name="tags" id="tags" className="writeInput writeTags" placeholder="Add tags, separated by comma..."/>
                </div>
                <div className="writeFormGroup">
                    <textarea name="desc" id="desc" cols="60" rows="10" placeholder="Write about plants..." className="writeInput writeText" ></textarea>
                </div>
                
                <Button className="writeSubmit bg-col-primary">Publish</Button>
            </form>
            <Button className='blogBack' onClick={()=>history.push("/blog")} >Back</Button>
        </div>
    )
}

export default NewBlog
