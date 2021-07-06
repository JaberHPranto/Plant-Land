import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../../redux/actions/userActions'


function ProfileScreen({location,history}) {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        else {

            if (!user.name) {            
                dispatch(getUserDetails('profile'))
            }
            else {
                setEmail(user.email)
                setName(user.name)
            }
        }
    }, [history,userInfo,dispatch,user,location])

    const handleSubmit = (e) => {
        e.preventDefault()
        // dispatch(getUserDetails('profile'))
    }

    return (
        <Row>
            <Col md={3}>
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

                <Button type='submit' variant='primary'>Update</Button>
            </Form>
            </Col>
            <Col md={9} ><h1>My Orders</h1></Col>
        </Row>
    )
}

export default ProfileScreen
