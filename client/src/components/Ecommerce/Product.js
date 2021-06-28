import React from 'react'
import { Button, Card } from 'react-bootstrap'

function Product({product}) {
    return (
        <Card className='my-3 p-3'>
            <a href={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </a>    
            <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text as='div' className='my-3'>
                    
                    {product.rating} Ratings from {product.numReviews} Reviews 
                </Card.Text>

                <Card.Text as='h5' className=''>
                     <span style={{fontSize:'1.8rem'}}>৳</span>&nbsp;{product.price}
                </Card.Text>

                <Button variant="primary">View Details</Button>
            </Card.Body>
        </Card>
    )
}

export default Product
