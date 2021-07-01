import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from "../components/Ecommerce/Footer";
import Header from "../components/Ecommerce/Header";
import CartScreen from '../components/Ecommerce/Screen/CartScreen';
import HomeScreen from '../components/Ecommerce/Screen/HomeScreen';
import ProductScreen from '../components/Ecommerce/Screen/ProductScreen';
import '../styles/ecommerce.css';

function EcommercePage() {
    return (
        <Router>
            <Header />
            <main>
                <Container>
                    <Route path="/" exact component={HomeScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/cart/:id?" component={CartScreen} />
                </Container>
            </main>
            <Footer />
        </Router>
    )
}

export default EcommercePage
