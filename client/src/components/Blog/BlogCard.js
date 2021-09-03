import React from 'react'
import { Button, Card } from 'react-bootstrap'

function BlogCard() {
    return (
        <div>
            <Card style={{ width: '24rem'}}>
            <Card.Img style={{padding:'0.7rem'}} variant="top" src="https://images.unsplash.com/photo-1520121401995-928cd50d4e27?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" />
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            </Card>            
        </div>
    )
}

export default BlogCard
