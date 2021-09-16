import React, { useEffect } from 'react'
import { Badge, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogById } from '../../redux/actions/blogActions'
import '../../styles/blog.css'
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
                        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="blog hero"
                    />
                    
                    <h1 className='blog-det-title'>{blog.title}</h1>
                    <div className='blog-det-info'>
                        <p>By <span className='info-span'>Jaber Hossain Pranto</span></p>
                        <p>Published in <span className='info-span'>{blog.category}</span></p>
                        <p>{blog.createdAt && blog.createdAt.substr(0,10)}</p>
                    </div>
                    <div className='blog-det-desc'>
                        {blog.description}
                    </div>
                    <div className="blog-det-tags">
                        {blog.tags && blog.tags.map((tag, index) => (                      
                            <Badge key={index} className="blog-card-badge blog-det-badge">{tag}</Badge>                        
                            ))}
                    </div>
                    <div className='blog-card-icons blog-det-icons'>
                        <i className="far fa-thumbs-up blog-det-like" aria-hidden="true"><span>&nbsp;5</span></i>
                        <i className="far fa-comments blog-det-comments" aria-hidden="true"><span>&nbsp;4</span></i>
                    </div>
                </>
                
            )}
            
            
        </Container>
    )
}

export default BlogDetails
