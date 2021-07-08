import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../../redux/actions/userActions'
import FormContainer from '../FormContainer'
import GoogleAuth from '../GoogleAuth'
import Loader from '../Loader'
import Message from '../Message'
import { toastInfoMessage } from '../ToastMessage'

function LoginScreen({location,history}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    
    useEffect(() => {
        if (userInfo) {
            toastInfoMessage(`Hey, nice to see you back ${userInfo.user.name}`)
            history.push(redirect)
        }
    }, [history,redirect,userInfo])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1 className='text-center'>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className='mb-3 mt-3'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password" className='mb-1'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </Form.Group>
                <Link to ="/forget-password" >Forget Password ?</Link>

                <Button type='submit' variant='primary' className="auth-btn mb-2 mt-4" >Sign In</Button>
            </Form>

            <Row>
                <Col className="text-center my-1" ><h6>Or</h6></Col>
            </Row>

            <Row>
                <Col> <GoogleAuth /> </Col>
            </Row>

            <Row className="py-3">
                <Col>
                    Don't have an Account ?  <Link to={redirect ? `/register?redirect=${redirect}`:'/'}  >Create one</Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default LoginScreen
