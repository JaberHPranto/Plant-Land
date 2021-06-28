import React from 'react';
import { Container } from 'react-bootstrap';
import Footer from "../components/Ecommerce/Footer";
import Header from "../components/Ecommerce/Header";
import HomeScreen from '../components/Ecommerce/Screen/HomeScreen';
import '../styles/ecommerce.css';

function EcommercePage() {
    return (
        <div>
            <Header />
            <main>
                <Container>
                    <HomeScreen />
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default EcommercePage
