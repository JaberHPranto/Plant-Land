import React from 'react'
import '../../styles/ecommerce.css'

function Rating({ value, text }) {
    return (
        <div className="rating">
            <div style={{ color: '#faef67' }}>
                <span>
                <i className={value >=1 ? 'fas fa-star': value >=0.5 ? 'fas fa-star-half-alt' : 'far fas-star'}></i>
                </span>
                <span>
                    <i className={value >=2 ? 'fas fa-star': value >=1.5 ? 'fas fa-star-half-alt' : 'far fas-star'}></i>
                </span>
                <span>
                    <i className={value >=3 ? 'fas fa-star': value >=2.5 ? 'fas fa-star-half-alt' : 'far fas-star'}></i>
                </span>
                <span>
                    <i className={value >=4 ? 'fas fa-star': value >=3.5 ? 'fas fa-star-half-alt' : 'far fas-star'}></i>
                </span>
                <span>
                    <i className={value >=5 ? 'fas fa-star': value >=4.5 ? 'fas fa-star-half-alt' : 'far fas-star'}></i>
                </span>
            </div>

            {text !== 'hidden' && (
                <div className='rating_text'>
                    <span>{text ? `${text} reviews` : 'No reviews yet'}</span>
                </div>
            )}

        </div>
    )
}

export default Rating
