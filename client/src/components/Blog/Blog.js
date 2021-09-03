import React from 'react'
import { Col, Row } from 'react-bootstrap'
import blogHome from '../../images/blogHome.jpg'
import '../../styles/blog.css'
import BlogCard from './BlogCard'

function Blog() {
    const blogCategories = ['All', 'Plant', 'Gardening', 'Green Living']
    const num = [1,2,3,4,5]
    return (
        <>
            <div className="blog-home">              
                <img className="blog-home-img" src={blogHome} alt="blog-home" />
                <div className="blog-home-text">
                    <h3>Latest Articles</h3>
                    <p>Discover the most outstanding articles in all topics related to Plants</p>
                </div>
                
                <Row className="blog-row">
                    <Col md={2}>
                        <div className='blog-category'>
                            <h5>Category</h5>
                            {blogCategories.map(blog => (
                                <div>{blog}</div>
                            ))}
                        </div>
                    </Col>
                    <Col md={10}>
                        <Row>
                            {num.map(n => (
                                <Col xs={12} sm={6} md={6} lg={4} className='blog-card'>
                                    <BlogCard />
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row> 
            </div>
        </>
    )
}

export default Blog
