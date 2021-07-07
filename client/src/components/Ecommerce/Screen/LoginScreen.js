import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { login } from '../../../redux/actions/userActions'
import FormContainer from '../FormContainer'
import GoogleAuth from '../GoogleAuth'
import Loader from '../Loader'
import Message from '../Message'

toast.configure()

function LoginScreen({location,history}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    
    useEffect(() => {
        if (userInfo) {
            toast.info(`Hey, nice to see you back ${userInfo.user.name}`)
            history.push(redirect)
        }
    }, [history,redirect,userInfo])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </Form.Group>

                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>

            <GoogleAuth />

            <Row className="py-3">
                <Col>
                    Don't have an Account ?  <Link to={redirect ? `/register?redirect=${redirect}`:'/'}  >Create one</Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default LoginScreen
