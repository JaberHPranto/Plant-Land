import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../redux/actions/productActions'
import Product from '../Product'


function HomeScreen() {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
    

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])


    return (
        <div>
            <h2>Latest Products</h2>
            {loading ? 'loading....' : error ? <h1>{error}</h1> : (
                <Row>
                {products.map(product => (
                    <Col key={product._id} xs={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
            )}
            
        </div>
    )
}

export default HomeScreen
