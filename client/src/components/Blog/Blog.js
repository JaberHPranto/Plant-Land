import React from 'react'
import { Col, Row } from 'react-bootstrap'
import '../../styles/blog.css'
import BlogCard from './BlogCard'

function Blog() {
    const blogCategories = ['All', 'Plant', 'Gardening', 'Green Living']
    const num = [1,2,3,4,5]
    return (
        <>
            <div className="blog-home">              
                <div className="blog-home-img">
                    <h1>Blogs</h1>
                    <p>We all need a little green in our lives</p>
                </div>
                <div className="blog-home-text">
                    <h3>Latest Articles</h3>
                    <p>Discover the most outstanding articles in all topics related to Plants</p>
                </div>
                
                <Row className="blog-row">
                    <Col md={2} xs={12}>
                        <div className='blog-category'>
                            <h5>Category</h5>
                            {blogCategories.map(blog => (
                                <div key={blog}>{blog}</div>
                            ))}
                        </div>
                    </Col>
                    <Col md={10} xs={12}>
                        <Row>
                            {num.map(n => (
                                <Col key={n} xs={12} md={6} lg={4} xl={4} className='blog-card'>
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
