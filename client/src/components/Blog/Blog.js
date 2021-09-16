import React, { useEffect } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { fetchBlogs } from '../../redux/actions/blogActions'
import '../../styles/blog.css'
import Loader from '../Ecommerce/Loader'
import BlogCard from './BlogCard'
import { blogCategories, blogTags } from './BlogSeedData'

function Blog() {

    const history = useHistory()
    const dispatch = useDispatch()

    const blogList = useSelector(state => state.blogList)
    const { loading, blogs} = blogList

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    function handleCreateBlog(){
        history.push("/newblog")
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
                    {loading ? <Loader /> :  (
                        <Col md={10} xs={12}>
                            <Row>
                                {blogs && blogs.map((blog,index) => (
                                    <Col key={index} xs={12} md={6} lg={4} xl={4} className='blog-card'>
                                        <BlogCard blog={blog}/>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                    )}
                </Row> 
            </div>
        </>
    )
}

export default Blog
