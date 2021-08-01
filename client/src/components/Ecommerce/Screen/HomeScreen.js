import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../redux/actions/productActions'
import FilterCategory from '../FilterCategory'
import Loader from '../Loader'
import Message from '../Message'
import Paginate from '../Paginate'
import Product from '../Product'


function HomeScreen({ match }) {
    
    const [productCategory, setProductCategory] = useState('')

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, numOfPages } = productList
    
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const category = productCategory


    useEffect(() => {
        dispatch(fetchProducts(keyword,pageNumber,category))
    }, [dispatch,keyword,pageNumber,category])

    const handleCategoryChange = (e) => {
        setProductCategory(e.toLowerCase());
    }

    return (
        <div>
            <FilterCategory handleCategoryChange={handleCategoryChange}/>
            <h2>Latest Products</h2>

            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Row> 
                        {products.map(product => (
                            <Col key={product._id} xs={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate numOfPages={numOfPages} page={page} keyword={keyword ? keyword : ''} />
                </>
                    
                )}
                    

            
            
        </div>
    )
}

export default HomeScreen
