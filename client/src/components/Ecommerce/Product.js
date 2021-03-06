import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import "../../styles/ecommerce.css"
import Rating from './Rating'

function Product({ product }) {

    const history = useHistory()
    const HandleViewDetails = (id) => {
        history.push(`/product/${id}`)
    }
   

    return (
        <Card className='my-3 p-3'>
            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} />
            </Link>    
            <Card.Body>
                    <Card.Title className="product_name">{product.name}</Card.Title>    
                <Card.Text as='div' className='my-3'>
                    <Rating value={product.rating} text={product.numReviews}/>
                </Card.Text>

                <Card.Text as='h5' className="product_name">
                     <span style={{fontSize:'1.3rem'}}>৳</span>&nbsp;{product.price}
                </Card.Text>

                <Button className="bg-col-primary" onClick={()=>HandleViewDetails(product._id)} >View Details</Button>
            </Card.Body>
        </Card>
    )
}

export default Product
