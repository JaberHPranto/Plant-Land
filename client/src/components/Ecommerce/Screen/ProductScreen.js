import React, { useEffect } from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchProductById } from '../../../redux/actions/productActions'
import '../../../styles/ecommerce.css'
import Loader from '../Loader'
import Message from '../Message'
import Rating from '../Rating'

function ProductScreen({match}) {

    const dispatch = useDispatch()
    const productDetails = useSelector(state => state.productDetails)
    const {loading,error,product} = productDetails

    useEffect(() => {
        dispatch(fetchProductById(match.params.id))
    }, [dispatch,match])


    return (
        <div>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant="alert">{error}</Message> : (
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid/>
                    </Col>

                    <Col md={4}>
                    <ListGroup variant="flush">
                            <ListGroup.Item className="product_heading"><h2>{product.name}</h2></ListGroup.Item>
                            <ListGroup.Item>{product.description}</ListGroup.Item>
                            <ListGroup.Item><Rating value={product.rating} text={product.numReviews} /></ListGroup.Item>
                            <ListGroup.Item className="product_price"><span style={{fontSize:'2rem'}}>৳</span>&nbsp;{product.price}</ListGroup.Item>
                    </ListGroup>
                    </Col>

                    <Col md={3}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price : </Col>
                                        <Col><strong>{product.price}</strong> &nbsp; Taka</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status : </Col>
                                        <Col>{product.countInStock > 0 ? "In Stock " : "Out of Stock"}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                <Button style={{width:'100%'}} className="btn btn-success" disabled={product.countInStock===0}>Add to cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
            
        </div>

    )
}

export default ProductScreen
