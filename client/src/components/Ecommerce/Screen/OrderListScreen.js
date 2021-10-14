import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getOrderList } from '../../../redux/actions/orderActions'
import Loader from '../Loader'
import Message from '../Message'
import Sidebar from '../Sidebar'

function OrderListScreen({history}) {

    const dispatch = useDispatch()
    const { userInfo: { user } } = useSelector(state => state.userLogin)
    
    
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList
    
    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getOrderList())
        } else {
            history.push("/login")
        }
    }, [dispatch,history,user])


    return (
        <>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <>
                        <h1>All Orders</h1>
                        <Table striped bordered hover>   
                            <thead>
                                <tr>
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>Delivered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order=>(
                                    <tr key={order._id}>
                                        <td>{order.user && order.user.name}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td><span style={{fontSize:'1.5rem',marginRight:'0.1rem'}}>৳</span>&nbsp;{order.totalPrice}</td>               
                                        <td>
                                            {order.isPaid ? order.paidAt.substring(0,10) : <Button variant='light' ><i className='fas fa-times' style={{color:'red'}}></i></Button>}
                                        </td>
                                        <td>
                                            {order.isDelivered ? order.deliveredAt.substring(0,10) : <Button variant='light' ><i className='fas fa-times' style={{color:'red'}}></i></Button>}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='bg-col-primary' >Details</Button>
                                            </LinkContainer>
                                        </td>                               
                                    </tr>
                                ))}
                            </tbody>    
                        </Table>        
                    </>
                    )}
                    
                </Col>
            </Row>
            
        </>    
    )
}

export default OrderListScreen
