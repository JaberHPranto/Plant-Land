import React, { useEffect } from 'react'
import { Badge, Container } from 'react-bootstrap'
import ReactHtmlParser from 'react-html-parser'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogById } from '../../redux/actions/blogActions'
import '../../styles/bl2og.css'
import Loader from '../Ecommerce/Loader'
import Message from '../Ecommerce/Message'

function BlogDetails({match}) {
    const dispatch = useDispatch()
    const blogDetails = useSelector(state => state.blogDetails)
    const { loading, blog, error } = blogDetails
    useEffect(() => {
        dispatch(fetchBlogById(match.params.id))
    }, [dispatch,match])
    
    return (
        <Container className='blog-det-container'>
            {loading ? <Loader /> : error ? <Message variant="alert">{error}</Message> : blog && (
                <>
                    <img className="blog-det-image"
                        src={blog.image}
                        alt="blog hero"
                    />
                    
                    <h1 className='blog-det-title'>{blog.title}</h1>
                    <div className="blog-det-info-div">
                        <div className='blog-det-info'>
                            <p>By <span className='info-span'>{blog.author}</span></p>
                            <p>Published in <span className='info-span'>{blog.category}</span></p>
                            <p>{blog.createdAt && new Date(blog.createdAt).toDateString()}</p>
                        </div>
                        <div className='blog-card-icons blog-det-icons'>
                            <i className="far fa-thumbs-up blog-det-like" aria-hidden="true"><span>&nbsp;5</span></i>
                            <i className="far fa-comments blog-det-comments" aria-hidden="true"><span>&nbsp;4</span></i>
                        </div>
                    </div>
                    
                    <div className='blog-det-desc'>
                        {ReactHtmlParser(blog.description)}
                    </div>
                    <div className="blog-det-tags">
                        {blog.tags && blog.tags.map((tag, index) => (                      
                            <Badge key={index} className="blog-card-badge blog-det-badge">{tag}</Badge>                        
                            ))}
                    </div>
                </>
                
            )}
            
            
        </Container>
    )
}

export default BlogDetails
