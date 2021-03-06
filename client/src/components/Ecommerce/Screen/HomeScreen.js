import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../../redux/actions/productActions'
import "../../../styles/ecommerce.css"
import FilterCategory from '../FilterCategory'
import FilterSort from "../FilterSort"
import Loader from '../Loader'
import Message from '../Message'
import Paginate from '../Paginate'
import Product from '../Product'
import SearchBox from '../SearchBox'


function HomeScreen({ match }) {
    
    const [productCategory, setProductCategory] = useState('')
    const [productSort, setProductSort] = useState('')

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, numOfPages } = productList
    
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1
    const category = productCategory
    const sort = productSort

    useEffect(() => {
        dispatch(fetchProducts(keyword,pageNumber,category,sort))
    }, [dispatch,keyword,pageNumber,category,sort])

    const handleCategoryChange = (e) => {
        setProductCategory(e.toLowerCase());
    }

    const handleSortChange = (e) => {
        setProductSort(e);
    }

    return (
        <div>
            <Row className="home-filter-info">
                <Col xs={12} md={3} className='home-filter-dropdown'>
                    <FilterCategory  handleCategoryChange={handleCategoryChange} />
                </Col>
                <Col xs={12} md={6} >
                    <SearchBox />
                </Col>
                <Col xs={12} md={3} className='home-filter-dropdown'>
                    <FilterSort handleSortChange={handleSortChange} />
                </Col>
            </Row>
    
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
                    <Paginate numOfPages={numOfPages} page={page} sort={sort ? sort : " "} keyword={keyword ? keyword : ''} />
                </>
                    
                )}
                    

            
            
        </div>
    )
}

export default HomeScreen
