import React from 'react'
import { Button, Card, Col, Image, ListGroup, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import products from '../../../products'
import '../../../styles/ecommerce.css'
import Rating from '../Rating'

function ProductScreen({ match }) {
    const product = products.find(p=>p._id === match.params.id)
    return (
        <div>
            <Link className="btn btn-light my-3" to="/">Go Back</Link>

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
        </div>

    )
}

export default ProductScreen
