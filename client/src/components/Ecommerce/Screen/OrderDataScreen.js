import React, { useEffect } from 'react'
import { Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderData } from '../../../redux/actions/orderActions'
import "../../../styles/ecommerce.css"
import Loader from "../Loader"
import Message from "../Message"
import Sidebar from "../Sidebar"


function OrderDataScreen({history}) {

    const dispatch = useDispatch()
    const { userInfo: { user } } = useSelector(state => state.userLogin)

    const order = useSelector(state => state.orderData)
    const { loading, error, orderData } = order

    // if(orderData) console.log(orderData)

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
                                <Row>

                                    {/* Card-data */}
                                    <div className="order-data-card">
                                        <div className="order-data order-total">
                                            <div>
                                                <i className="fas fa-shopping-cart"></i>
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
                                                <i className="fas fa-truck"></i>
                                                <h4>Order Delivered</h4>
                                            </div>
                                            <p>{orderData.totalDelivered}</p>
                                        </div>
                                    </div>
                                </Row>

                                <Row className="order-data-table">
                                    <Col md={6} sm={12} xs={12}>
                                        <h3 className="odt-heading">Top Sold Products</h3>
                                        <Table striped bordered>
                                            <thead>
                                                <tr>
                                                    <th>Plant</th>
                                                    <th>Quantity Sold</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderData?.productSaleData?.map(product => (
                                                    <tr key={product._id}>
                                                        <td>{product._id}</td>
                                                        <td>{product.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    <Col md={1}> </Col>
                                    <Col md={5} sm={12} xs={12}>
                                        <h3 className="odt-heading">Top Buyers</h3>
                                        <Table striped bordered>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderData?.customerBuyData?.map(customer => (
                                                    <tr key={customer.customer_email}>
                                                        <td>{ customer.customer_name}</td>
                                                        <td>{customer.customer_email}</td>
                                                        <td>{customer.total}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                    </Col>
                                    
                                </Row>

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
