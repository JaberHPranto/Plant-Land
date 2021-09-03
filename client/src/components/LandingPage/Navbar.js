import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import '../../styles/landingPage.css'
function NavBar() {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg='light' className="navbar" fixed='top' >
                <Container>
                    <Navbar.Brand href="#home">PlantLand</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto nav-item" >
                            <Nav.Link href="/search-plant">Plant Search</Nav.Link>
                            <Nav.Link href="/identify-plant">Identify Plant</Nav.Link>
                            <Nav.Link href="/blog">Blog</Nav.Link>
                            <Nav.Link href="/market">Market Place</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deeds">More deeds</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar
