import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../../../constants/orderConstants';
import { deliverOrder, getOrderDetails, payOrder } from "../../../redux/actions/orderActions";
import Loader from "../Loader";
import Message from "../Message";

const baseUrl = 'https://plantland.herokuapp.com'

const OrderScreen = ({ match,history }) => {

    const orderId = match.params.id
    const dispatch = useDispatch();

    const [sdkReady, setSdkReady] = useState(false)
    
    
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    
    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;
    
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { success: successDeliver } = orderDeliver;
    
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo:{user} } = userLogin;


    if (!loading) {
         const addDecimals = (num) => {
             return (Math.round(num * 100) / 100).toFixed(2);
             
        };
        order.itemsPrice = addDecimals(
             order?.orderedItems?.reduce((acc, item) => acc + item.price * item.qty, 0)
        );    
    }



    useEffect(() => {
        if (!user) {
            return history.push('/login')
        }
        
        const addPayPalScript = async (req, res) => {
            const { data: clientId } = await axios.get(`${baseUrl}/api/config/paypal`)
            console.log(clientId);

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
    
        }
        
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            }else setSdkReady(true)
        }

    }, [dispatch,order,orderId,successPay,successDeliver,history,user])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId,paymentResult))
    }

    const handleDeliver = () => {
        dispatch(deliverOrder(order))
    }

    // console.log(order._id)

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>Order {order._id}</h1>
             <Row>
                <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <h2>Shipping</h2>
                            <p><strong>Name: &nbsp; </strong> {order.user.name}</p>
                            <p><strong>Email: &nbsp;</strong> {order.user.email}</p>
                            <p>
                                <strong>Address: &nbsp;</strong> 
                                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                                {order.shippingAddress.thana}, {order.shippingAddress.houseNumber}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivery Done</Message> : <Message variant='danger'>Not Delivered</Message>}
                            
                            
                    </ListGroup.Item>

                    <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>

                            {order.isPaid ? <Message variant='success'>Payment Done</Message> :  <Message variant='danger'>Not Paid</Message> }
                            
                    </ListGroup.Item>
                    <ListGroup.Item>
                    <h2>Order Items</h2>
                    {order?.orderedItems?.length === 0 ? (
                        <Message>Order is empty</Message>
                    ) : (
                        <ListGroup variant="flush">
                        {order?.orderedItems?.map((item, index) => (
                            <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                />
                                </Col>
                                <Col>
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>
                                </Col>
                                <Col md={4}>
                                {item.qty} x ৳{item.price} = ৳{item.qty * item.price}
                                </Col>
                            </Row>
                            </ListGroup.Item>
                        ))}
                        </ListGroup>
                    )}
                    </ListGroup.Item>
                </ListGroup>
                </Col>
                <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h3>Order Summary</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Items</Col>
                        <Col>৳{order.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                        <Col>Delivery Charge</Col>
                        <Col>৳{order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                        <Col>Total</Col>
                        <Col>৳{order.totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    
                            {user && !user.isAdmin && !order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                                
                            )}

                            {user && user.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button className='bg-col-primary' style={{width:'100%'}}  onClick={handleDeliver} > Mark as Delivered</Button>
                                </ListGroup.Item>
                            )}
                    
                    </ListGroup>
                </Card>
                </Col>
            </Row>
        </>
    
};

export default OrderScreen;
