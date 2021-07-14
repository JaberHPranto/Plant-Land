import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        }else history.push("/market")
    }

    return (
        <>
            <Form onSubmit={handleSubmit} inline className='d-flex' >
                <Form.Control
                    type="text"
                    placeholder="Search Products..."
                    className="mr-sm-2 ml-sm-5"
                    name='q'
                    onChange={(e)=>setKeyword(e.target.value)}
                ></Form.Control>
                <Button className="btn btn-outline-light" type='submit' >Search</Button>
            </Form>
        </>
    )
}

export default SearchBox
