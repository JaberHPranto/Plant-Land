import React, { useEffect } from 'react'
import { Button, Card, Col, FormControl, Image, ListGroup, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../../../redux/actions/cartActions'
import Message from '../Message'


function CartScreen({ match, history, location }) {
    const dispatch = useDispatch()
    
    const productId = match.params.id
    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const {cartItems} = useSelector(state => state.cart)

    useEffect(() => {
        if(productId)
            dispatch(addToCart(productId,qty))
    }, [dispatch, productId, qty])
    
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <div>
            <Row>
                <h2 style={{padding:'1rem'}}>Shopping Cart</h2>
                <Col md={8}>
                    {cartItems.length === 0 ? <Message>Your cart is empty. <Link to="/">Go Back</Link></Message> : (
                        <ListGroup variant='flush' >
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.productId} >
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col md={4}>
                                            <Link to={`/product/${item.productId}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2} style={{fontSize:'1.2rem'}}>
                                            <span style={{fontSize:'1.3rem'}}>৳</span>&nbsp;{item.price}
                                        </Col>
                                        <Col md={2}>
                                                <FormControl as='select'
                                                    value={item.qty} onChange={(e) =>dispatch(addToCart(item.productId,Number(e.target.value)))}
                                                >
                                                    {[...Array(item.countInStock).keys()].map(p => (
                                                        <option key={p+1} value={p+1}>{p+1}</option>
                                                    ))}
                                                </FormControl>
                                        </Col>
                                        <Col md={2}>
                                            <Button variant='light' type="button" onClick={()=>removeFromCartHandler(item.productId)}><i className="fas fa-trash"></i></Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                            
                        </ListGroup>
                    )}
                </Col>
                <Col md={1}></Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty,0)}) items</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>   
                                    <Col>{cartItems.reduce((acc,item)=>acc + item.qty * item.price,0).toFixed(2)}</Col>                                 
                                </Row>   
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='btn-block' variant="success" disabled={cartItems.length === 0} style={{ width: '100%' }}
                                onClick={checkoutHandler} >Proceed to checkout</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
                
           </Row>
        </div>
    )
}

export default CartScreen
