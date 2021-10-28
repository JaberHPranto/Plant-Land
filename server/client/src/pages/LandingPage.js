import React from 'react'
import Feature from '../components/LandingPage/Feature'
import HeroSection from '../components/LandingPage/HeroSection'
import NavBar from '../components/LandingPage/Navbar'

function LandingPage() {
    return (
        <div>
            <NavBar />
            <HeroSection />
            <Feature />
        </div>
    )
}

export default LandingPage
