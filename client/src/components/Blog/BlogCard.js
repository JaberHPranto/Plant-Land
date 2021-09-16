import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import "../../styles/blog.css"

function BlogCard({ blog }) {
    const history = useHistory()
    const handleViewBlog = (id) => {
        history.push(`/blog/${id}`)
    }
    return (
        <div>
            <Card style={{ width: '24rem', minWidth: '18rem' }}>
                <Link to={`/blog/${blog._id}`}>
                <Card.Img style={{ padding: '0.7rem' }} variant="top" src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" />
                    
                </Link>
                <Card.Body>
                    <Card.Title className="blog-card-title">{blog.title}</Card.Title>
                    {blog.tags.map((tag,index) => (
                        <Badge key={index} className="blog-card-badge">{tag}</Badge>
                    ))}
                    <Card.Text className="blog-card-desc">
                        {blog.description}
                    </Card.Text>

                    <div style={{ display: 'flex', justifyContent:'space-between'}}>
                        <Button className="bg-col-primary" onClick={()=>handleViewBlog(blog._id)} >Read More &nbsp; <i className="fa fa-chevron-right"></i> </Button>
                        <div className='blog-card-icons'>
                            <i className="far fa-thumbs-up blog-card-like" aria-hidden="true"></i>
                            <i className="far fa-bookmark blog-card-bookmark" aria-hidden="true"></i>
                        </div>
                    </div>

            </Card.Body>
            </Card>            
        </div>
    )
}

export default BlogCard
