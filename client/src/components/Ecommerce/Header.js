import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>Plant Land</Navbar.Brand>
                    </LinkContainer>    
                
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>   
                        </LinkContainer> 
                     
                        <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                        </LinkContainer>                                        
                    </Nav>
                        
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
