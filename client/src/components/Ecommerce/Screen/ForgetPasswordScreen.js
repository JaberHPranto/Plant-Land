import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import Message from '../Message'
import { toastInfoMessage } from '../ToastMessage'

function ForgetPasswordScreen() {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        try {
            await axios.post("/api/users/forget-password", { email }, config)
            toastInfoMessage("Instructions to reset your password has been sent to your email")
            
        } catch (error) {
            setError(error.response && error.response.data.message ? error.response.data.message : error.message)
            setEmail('')
            setTimeout(() => {
                setError("")
            }, 3000);

        }
    }
    return (
        <FormContainer>
            <h1 className='py-2'>Forget Password ?</h1>
            <p className='mb-5'>Enter the email address you used when you joined and we’ll send you instructions to reset your password.</p>
            {error && <Message variant='danger'>{error}</Message>}

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className='mb-3 mt-5'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=> setEmail(e.target.value)} />
                </Form.Group>

                <Button type='submit' variant='primary' className="auth-btn" >Submit</Button>
            </Form>            
        </FormContainer>
    )
}

export default ForgetPasswordScreen
