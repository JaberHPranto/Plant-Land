import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function FormContainer({children}) {
    return (
        <Container>
            <Row className="justify-content-md-center" >
                <Col xs={10} md={5}> {children} </Col>
            </Row>
        </Container>
    )
}

export default FormContainer
