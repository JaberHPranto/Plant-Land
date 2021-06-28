import React from 'react'
import { Col, Row } from 'react-bootstrap'
import products from '../../../products'
import Product from '../Product'

function HomeScreen() {
    return (
        <div>
            <h2>Latest Products</h2>
            <Row>
                {products.map(product => (
                    <Col xs={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
