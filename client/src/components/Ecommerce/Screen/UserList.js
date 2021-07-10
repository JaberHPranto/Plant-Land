import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { getUserList } from '../../../redux/actions/userActions'
import Loader from '../Loader'
import Message from '../Message'

function UserList() {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)

    const { loading, error, users } = userList
    
    useEffect(() => {
        dispatch(getUserList())
    }, [dispatch])

    const handleDelete = () => {
        console.log('deleted')
    }

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <h1>All Users</h1>
                <Table striped bordered hover>   
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.isAdmin ?
                                        <i className="fas fa-check" style={{ color: 'green' }}></i>:
                                        <i className="fas fa-times" style={{ color: 'red' }}></i>
                                    }
                                </td>
                                <td>
                                    <LinkContainer to={`users/${user._id}/edit`}>
                                        <Button ><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='light' onClick={handleDelete}><i className='fas fa-trash'></i></Button>
                                </td>                                
                            </tr>
                        ))}
                    </tbody>    
                </Table>        
            </>
            )}
        </>    
    )
}

export default UserList
