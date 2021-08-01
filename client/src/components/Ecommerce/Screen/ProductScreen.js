import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, FormControl, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PRODUCT_CREATE_REVIEW_RESET } from '../../../constants/productConstants'
import { createProductReview, fetchProductById } from '../../../redux/actions/productActions'
import '../../../styles/ecommerce.css'
import Loader from '../Loader'
import Message from '../Message'
import Rating from '../Rating'
import { toastSuccessMessage } from '../ToastMessage'

function ProductScreen({ match,history  }) {
    
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReview = useSelector(state => state.productCreateReview)
    const { error: reviewError, success: reviewSuccess } = productReview
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (reviewSuccess) {
            toastSuccessMessage('Thank you for submitting a review')
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        else if (reviewError) {
            setTimeout(() => {
              dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
            }, 4000);
        }
        dispatch(fetchProductById(match.params.id))
    }, [dispatch,match,reviewSuccess,reviewError])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <div>
            <Link className="btn btn-light my-3" to="/market">Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant="alert">{error}</Message> : (
              <>  
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
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <FormControl as='select'
                                                    value={qty} onChange={(e) => setQty(e.target.value)}
                                                >
                                                    {[...Array(product.countInStock).keys()].map(p => (
                                                        <option key={p+1} value={p+1}>{p+1}</option>
                                                    ))}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                <Button style={{width:'100%'}} className="btn bg-col-primary" disabled={product.countInStock===0} onClick={addToCartHandler} >Add to cart</Button>
                                </ListGroup.Item>
                            </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col md={5}>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup>
                                {product.reviews.map(r => (
                                    <ListGroup.Item key={r._id}>
                                        <strong>{r.name}</strong>
                                        <Rating value={r.rating} text={"hidden"} />
                                        <p>{r.createdAt.substring(0,10)}</p>
                                        <p>{r.comment}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <h2>Write a review</h2>
                            {userInfo ? (<>
                                {reviewError && <Message variant='danger'>{reviewError}</Message>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlId="rating" className='mb-3 mt-3'>
                                        <Form.Label>Give a rating</Form.Label>
                                        <Form.Control as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                            <option value=''>Select...</option>
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group controlId="comment" className='mb-4'>
                                        <Form.Label>Write a comment</Form.Label>
                                        <Form.Control as='textarea' value={comment} onChange={(e) => setComment(e.target.value)} />
                                    </Form.Group>

                                    <Button type='submit' variant='primary' className="auth-btn mb-2 bg-col-primary" >Submit</Button>

                                </Form>
                                
                            </>) : <Message>Please <Link to="/login">sign in</Link> to write a review</Message>}
                        </Col> 
                    </Row>    
                </>
            )}
            
        </div>

    )
}

export default ProductScreen
