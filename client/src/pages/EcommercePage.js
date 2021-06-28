import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from "../components/Ecommerce/Footer";
import Header from "../components/Ecommerce/Header";
import '../styles/ecommerce.css';

function EcommercePage() {
    return (
        <div>
            <Header />
            <main>
                <Container>
                    <h1>This is Pro Shop</h1>
                </Container>
                </main>
            <Footer />
        </div>
    )
}

export default EcommercePage
