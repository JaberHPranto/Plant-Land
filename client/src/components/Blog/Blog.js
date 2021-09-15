import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import '../../styles/blog.css'
import BlogCard from './BlogCard'
import { blogCategories, blogTags } from './BlogSeedData'

function Blog() {
    const num = [1, 2, 3, 4, 5]
    const history = useHistory()

    function handleCreateBlog(){
        history.push("/blog/new")
    }
    return (
        <>
            <div className="blog-home">              
                <div className="blog-home-img">
                        <h1>Blogs</h1>
                    <p>We all need a little green in our lives</p>
                </div>
                <div className="blog-home-text">
                    <div style={{ display:'flex',justifyContent:'space-between'}}>
                        <h3>Latest Articles</h3>
                        <Button onClick={handleCreateBlog} className="blog-btn bg-col-primary"><i className='fas fa-plus-circle'></i> &nbsp;Create Blog</Button>
                    </div>
                    <p>Discover the most outstanding articles in all topics related to Plants</p>
                </div>
                
                <Row className="blog-row">
                    <Col md={2} xs={12}>
                        <div className='blog-category'>
                            <h5>Category</h5>
                            {blogCategories.map(blog => (
                                <div className='blog-category-item' key={blog}>{blog}</div>
                            ))}
                        </div>
                        <div className="blog-tags">
                            <h4>Discover Tags</h4>
                            <div className="blog-tag-div">
                                {blogTags.map(tag => (
                                    <div key={tag} className="blog-tag">{tag}</div>
                                ))}
                            </div>
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
