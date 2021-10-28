import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import Message from '../Message'
import { toastSuccessMessage } from '../ToastMessage'

function ForgetPasswordScreen({match,history}) {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const clear = (errorText) => {
        setPassword("")
        setConfirmPassword("")
        setTimeout(() => {
            setError("")
        }, 3000);
        return setError(errorText)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password.length < 6) {
            return clear("Password must be at least 6 characters")
        } 
        if (password !== confirmPassword) {
            return clear("Password doesn't match")
        }


        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        
        try {
            await axios.put(`/api/users/reset-password/${match.params.resetToken}`, { password }, config)
            toastSuccessMessage("You're password has been updated")
            history.push("/login")
            
        } catch (error) {
            setError(error.response && error.response.data.message ? error.response.data.message : error.message)
            setPassword("")
            setConfirmPassword("")
            setTimeout(() => {
                setError("")
            }, 3000);

        }
    }
    return (
        <FormContainer>
            <h2 className='py-3 text-center'>Reset Your Password</h2>
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="password" className='mb-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=> setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="confirmPassword" className='mb-4'>
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=> setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button type='submit' variant='primary' className="auth-btn bg-col-primary" >Submit</Button>
            </Form>            
        </FormContainer>
    )
}

export default ForgetPasswordScreen
