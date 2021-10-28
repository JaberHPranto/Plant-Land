import React from 'react';
import { Spinner } from 'react-bootstrap';

function Loader() {
    return (
        <Spinner
            animation="border"
            variant="success"
            role="status"
            style={{
                width: '100px',
                height: '100px',
                margin: 'auto',
                display:'block'
            }}
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
    )
}

export default Loader
