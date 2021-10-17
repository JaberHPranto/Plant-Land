import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useLocation } from 'react-router-dom'
import { getMyOrders } from '../../../redux/actions/orderActions'
import { getUserDetails, updateUserProfile } from '../../../redux/actions/userActions'
import Loader from '../Loader'
import Message from '../Message'
import { toastSuccessMessage } from '../ToastMessage'


function ProfileScreen({history}) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()
    const location = useLocation()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const myOrderList = useSelector(state => state.myOrderList)
    const { loading: loadingOrders, error: errorOrders, orders } = myOrderList

    
    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        else {
            // for google users
            if (userInfo.token.length > 500) {
            setEmail(userInfo.user.email)
            setName(userInfo.user.name)
                
            } else {
                if (!user.name) {            
                    dispatch(getUserDetails('profile'))
                    dispatch(getMyOrders())
                }
                
                    else {
                        setEmail(user.email)
                        setName(user.name)
                    }
            }
        }
    }, [history,userInfo,dispatch,user,location,name])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUserProfile({ id: user._id, email, name, password }))
        toastSuccessMessage("Your profile has been updated")
    }

    return (
        <Row>
            <Col md={4}>
                <h2>User Profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={handleSubmit}>
                
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value={name} onChange={(e)=> setName(e.target.value)} />
                </Form.Group>             

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="confirmPassword">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                </Form.Group>

                    <Button type='submit' className='bg-col-primary' style={{ marginTop:'2rem' }}>
                        Update
                    </Button>
            </Form>
            </Col>
            <Col md={8} >
                <>
                        <h1>MY Orders</h1>
                    {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger' >{errorOrders}</Message> : (
                        <Table striped bordered hover>   
                            <thead>
                                <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>Delivered</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order=>(
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td><span style={{fontSize:'1.5rem',marginRight:'0.1rem'}}>৳</span>&nbsp;{order.totalPrice}</td>               
                                        <td>
                                            {order.isPaid ? order.paidAt.substring(0,10) : <Button variant='light' ><i className='fas fa-times' style={{color:'red'}}></i></Button>}
                                        </td>
                                        <td>
                                            {order.isDelivered ? order.deliverAt.substring(0,10) : <Button variant='light' ><i className='fas fa-times' style={{color:'red'}}></i></Button>}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/order/${order._id}`}>
                                                <Button className='bg-col-primary btn-sm' >Details</Button>
                                            </LinkContainer>
                                        </td>                               
                                    </tr>
                                ))}
                            </tbody>    
                        </Table>        
                    )}
                    </>
            </Col>
        </Row>
    )
}

export default ProfileScreen
