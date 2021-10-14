import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderData } from '../../../redux/actions/orderActions'
import { Button, Col, Row, Table } from 'react-bootstrap'
import Sidebar from "../Sidebar"
import Loader from "../Loader"
import Message from "../Message"
import "../../../styles/ecommerce.css"


function OrderDataScreen({history}) {

    const dispatch = useDispatch()
    const { userInfo: { user } } = useSelector(state => state.userLogin)

    const order = useSelector(state => state.orderData)
    const { loading, error, orderData } = order

    if(orderData) console.log(orderData)

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getOrderData())
        } else {
            history.push("/login")
        }
    }, [dispatch,history,user])

    return (
        <>
            <Row>
                <Col md={2}><Sidebar /> </Col>
                <Col md={10}>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <>
                            {orderData &&
                                <>
                                {/* Card-data */}
                                <div className="order-data-card">
                                    <div className="order-data order-total">
                                        <div>
                                            <i class="fas fa-shopping-cart"></i>
                                            <h4>Total Orders</h4>
                                        </div>
                                        <p>{orderData.totalOrder}</p>
                                    </div>
                                    
                                    <div className="order-data order-pending">
                                        
                                        <div>
                                            <i className="fas fa-clipboard-check op-i"></i>
                                            <h4>Order Paid</h4>
                                        </div>
                                        <p>{orderData.totalPaidOrder}</p>
                                    
                                    </div>
                                    
                                    <div className="order-data order-delivered">
                                        <div>
                                            <i class="fas fa-truck"></i>
                                            <h4>Order Delivered</h4>
                                        </div>
                                        <p>{orderData.totalDelivered}</p>
                                    </div>
                                </div>


                                </>
                           }
                            
                            
                        </>
                    )}
                </Col>
            </Row>
            
        </>
    )
}

export default OrderDataScreen
