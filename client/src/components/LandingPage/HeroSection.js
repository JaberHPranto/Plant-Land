import React from 'react'
import heroImg from '../../images/pngwing.com.png'
import '../../styles/landingPage.css'

function HeroSection() {
    return (
        <div className="hero">
            <div className="hero_text">
                <h1>Plant Land</h1>
                <p>A place where plant enthusiastic people meet and get along with each other</p>
                <button className="btn-grad">Explore</button>
            </div>
            <div className="hero_img">
                <img src={heroImg} alt="hero" height="500px"/>
            </div>
        </div>
    )
}

export default HeroSection
