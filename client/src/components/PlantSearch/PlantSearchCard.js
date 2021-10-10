import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import sample from '../../images/sample-plant.jpg';

function PlantSearchCard({ data }) {
   
    return (
        <>
            {data &&
                <Row className='ps-container'>
                {data.map(d => (
                    <LinkContainer to={`/search-plant/${d.id}`} style={{cursor:'pointer'}} key={d.id} >
                        <Col md={4} lg={4} sm={6} xs={12} >
                            <div className="ps-card">
                                {d.attributes.main_image_path.includes("/assets/baren_field_square") ? <img src={sample} alt="sample" className='ps-sample'/>: <img src={d.attributes.main_image_path} alt="sample" className='ps-sample'/>}
                                
                                <div className='ps-card-info'>
                                    <div className='ps-card-name'> {d.attributes.name} <br /> </div>
                                    <div className='ps-card-bi-name'> <span>Binomial Name:</span> {d.attributes.binomial_name} </div>
                                </div>
                            </div>
                        </Col>
                    </LinkContainer>
                    
                    ))}
                </Row>
            }
        </>
        
    )
}

export default PlantSearchCard
