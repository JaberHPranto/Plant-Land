import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { deleteProduct, fetchProducts } from '../../../redux/actions/productActions'
import Loader from '../Loader'
import Message from '../Message'
import { toastErrorMessage } from '../ToastMessage'

function UserList({history}) {

    const dispatch = useDispatch()

    const { userInfo: { user } } = useSelector(state => state.userLogin)
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete
    
    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(fetchProducts())
        } else {
            history.push("/login")
        }
    }, [dispatch,history,user,successDelete])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this user ?')) {
            dispatch(deleteProduct(id))
            if(!errorDelete)
                toastErrorMessage("User deleted")
        }
    }
    const handleCreateProduct= () => {}

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3 block" style={{float: 'right'}}><i className="fas fa-plus" onClick={handleCreateProduct}></i> Create Product</Button>
                </Col>
            </Row>
            
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <Table striped bordered hover>   
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Count In Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product=>(
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td><span style={{fontSize:'1.5rem',marginRight:'0.1rem'}}>৳</span>&nbsp;{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.countInStock}</td>
                                <td>
                                    <LinkContainer to={`users/${product._id}/edit`}>
                                        <Button ><i className='fas fa-edit'></i></Button>
                                    </LinkContainer>
                                </td>
                                <td>
                                    <Button variant='light' onClick={()=>handleDelete(product._id)}><i className='fas fa-trash'></i></Button>
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