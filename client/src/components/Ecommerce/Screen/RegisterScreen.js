import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { register } from '../../../redux/actions/userActions'
import FormContainer from '../FormContainer'
import Loader from '../Loader'
import Message from '../Message'
toast.configure()

function RegisterScreen({location,history}) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const redirect = location.search ? location.search.split("=")[1] : "/login"

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister
    
    useEffect(() => {
        if (userInfo) {
            toast.success("Account created successfully. Please login to see profile", {autoClose: 3000,})
            history.push("/login")
        }
    }, [history,redirect,userInfo])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name, email, password);
        dispatch(register(name,email,password,confirmPassword))
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
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

                <Button type='submit' variant='primary'>Sign Up</Button>
            </Form>

            <Row className="py-3">
                <Col>
                    Already Have an Account ?  <Link to={redirect ? `/register?redirect=${redirect}`:'/login'}>Sign in</Link>
                </Col>
            </Row>
            
            
        </FormContainer>
    )
}

export default RegisterScreen
