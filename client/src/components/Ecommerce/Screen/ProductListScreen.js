import React, { useEffect } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { PRODUCT_CREATE_RESET } from '../../../constants/productConstants'
import { createProduct, deleteProduct, fetchProducts } from '../../../redux/actions/productActions'
import Loader from '../Loader'
import Message from '../Message'
import Sidebar from '../Sidebar'
import { toastErrorMessage } from '../ToastMessage'

function ProductListScreen({history}) {

    const dispatch = useDispatch()

    const { userInfo: { user } } = useSelector(state => state.userLogin)
    
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product:createdProduct } = productCreate
    const productDelete = useSelector(state => state.productDelete)
    const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete
    

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        
        if (!user.isAdmin) 
            history.push('/login')

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }    
        else {
            dispatch(fetchProducts())
        }
    }, [dispatch,history,user,successDelete,successCreate,createdProduct])

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product ?')) {
            dispatch(deleteProduct(id))
            if(!errorDelete)
                toastErrorMessage("Product deleted")
        }
    }
    const handleCreateProduct = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row>
                <Col md={2}>
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <Row className="align-items-center">
                        
                        <Col>
                            <h1>Products</h1>
                        </Col>
                        <Col className="text-right">       
                            <Button className="my-3 block bg-col-primary" style={{float: 'right'}} onClick={handleCreateProduct}><i className="fas fa-plus" onClick={handleCreateProduct}></i> Create Product</Button>
                        </Col>
                    </Row>
                    
                    {loadingCreate && <Loader />}
                    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
                    {loadingDelete && <Loader />}
                    {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
                    
                    {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        
                        <>
  
                            <Table striped bordered hover>
                                
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>In Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product=>(
                                        <tr key={product._id}>
                                            <td>{product.name}</td>
                                            <td><span style={{fontSize:'1.5rem',marginRight:'0.1rem'}}>৳</span>&nbsp;{product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.countInStock}</td>
                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button className='bg-col-primary'><i className='fas fa-edit'></i></Button>
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
                </Col>
            </Row>
           
        </>    
    )
}

export default ProductListScreen
