import React from 'react'
import { Badge, Container } from 'react-bootstrap'
import '../../styles/blog.css'

function BlogDetails() {
    const tags = ['plant','indoor','gardening']
    return (
        <Container className='blog-det-container'>
            <img className="blog-det-image"
                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="blog hero"
            />
            <h1 className='blog-det-title'>A Plant’s Journey Home </h1>
            <div className='blog-det-info'>
                <p>By <span className='info-span'>Jaber Hossain Pranto</span></p>
                <p>Published in <span className='info-span'>Plant</span></p>
                <p>19 September,2021</p>
            </div>
            <div className='blog-det-desc'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor distinctio veritatis sapiente, minima corrupti dolores necessitatibus suscipit accusantium dignissimos culpa cumque.
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.                
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor distinctio veritatis sapiente, minima corrupti dolores necessitatibus suscipit accusantium dignissimos culpa cumque.
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                
            </div>
            <div className="blog-det-tags">
                {tags.map((tag, index) => (                      
                    <Badge key={index} className="blog-card-badge blog-det-badge">{tag}</Badge>                        
                    ))}
            </div>
            <div className='blog-card-icons blog-det-icons'>
                <i className="far fa-thumbs-up blog-det-like" aria-hidden="true"><span>&nbsp;5</span></i>
                <i className="far fa-comments blog-det-comments" aria-hidden="true"><span>&nbsp;4</span></i>
            </div>
            
        </Container>
    )
}

export default BlogDetails
