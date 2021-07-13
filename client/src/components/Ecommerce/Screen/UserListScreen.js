import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteUser, getUserList } from '../../../redux/actions/userActions'
import Loader from '../Loader'
import Message from '../Message'
import { toastErrorMessage } from '../ToastMessage'

function UserListScreen({history}) {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const { userInfo: { user } } = useSelector(state => state.userLogin)
    const { success: deleteSuccess } = useSelector(state => state.userDelete)
    

    const { loading, error, users } = userList
    
    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getUserList())
        } else {
            history.push("/login")
        }
    }, [dispatch,history,user,deleteSuccess])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user ?')) {
            dispatch(deleteUser(id))
            toastErrorMessage("User deleted")
        }
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
                                    <Button variant='light' onClick={()=>handleDelete(user._id)}><i className='fas fa-trash'></i></Button>
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

export default UserListScreen
