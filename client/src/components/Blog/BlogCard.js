import React from 'react'
import { Badge, Button, Card } from 'react-bootstrap'
import "../../styles/blog.css"

function BlogCard() {
    const tags = ['plant','indoor','gardening']
    return (
        <div>
            <Card style={{ width: '24rem', minWidth: '18rem' }}>
                <Card.Img style={{ padding: '0.7rem' }} variant="top" src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" />
                <Card.Body>
                    <Card.Title className="blog-card-title">How to plant</Card.Title>
                    {tags.map(tag => (
                        <Badge className="blog-card-badge">{tag}</Badge>
                    ))}
                    <Card.Text className="blog-card-desc">
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. A provident sint ipsam voluptate inventore deleniti, hic eligendi perspiciatis cum, rerum, facere sequi perferendis. Et temporibus, laboriosam velit quae quas non?
                    </Card.Text>

                    <div style={{ display: 'flex', justifyContent:'space-between'}}>
                        <Button className="bg-col-primary">Read More &nbsp; <i className="fa fa-chevron-right"></i> </Button>
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
