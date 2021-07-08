import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useHistory } from 'react-router-dom'
import { logout } from '../../redux/actions/userActions'
import SearchBox from './SearchBox'
import { toastErrorMessage } from './ToastMessage'


function Header() {
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        dispatch(logout())
        history.push("/")
        toastErrorMessage("You're logged out")
    }
    
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
                            <SearchBox />
                    </Nav>
                    <Nav>
                        <LinkContainer to="/cart">
                            <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>   
                        </LinkContainer> 
                            {userInfo ? (
                                <NavDropdown title={userInfo.user.name} id="name" variant="success">
                                    {/* <LinkContainer to="/profile"> */}
                                        <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    {/* </LinkContainer> */}
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i>Sign In</Nav.Link>
                                </LinkContainer>                                  
                            )}                
                    </Nav>
                        
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
