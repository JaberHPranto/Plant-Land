import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { GoogleLogin } from 'react-google-login'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { googleLogin, login } from '../../../redux/actions/userActions'
import FormContainer from '../FormContainer'
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

    const googleSuccess = async (res) => {
        // console.log(res);
        const user = res?.profileObj;
        const token = res?.tokenId
        
        try {
            const data = { user, token }
            dispatch(googleLogin(data))
            history.push("/")
        } catch (error) {
            console.log(error);
        }
  
    }
    const googleFailure = () => {
        console.log("Google Sign in was unsuccessful. Try again later");
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

            <GoogleLogin
                clientId="194822757324-85cbm8js64av331n4ouf1aqr4ot4veju.apps.googleusercontent.com"
                render={(renderProps) => (
                    <Button color="primary"
                        onClick={renderProps.onClick} disabled={renderProps.disabled}
                    >
                        Google Sign in
                    </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
            />

            <Row className="py-3">
                <Col>
                    Don't have an Account ?  <Link to={redirect ? `/register?redirect=${redirect}`:'/'}  >Create one</Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default LoginScreen
