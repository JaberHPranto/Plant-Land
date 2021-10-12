import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import "../../styles/plant-identify.css";
import Loader from "../Ecommerce/Loader";
import PIDetailsModal from './PIDetailsModal';

function PlantIdentify() {
    const [file, setFile] = useState()
    const [imageUrl, setImageUrl] = useState("")
    const [plantSuggestion, setPlantSuggestion] = useState([])
    const [loading, setLoading] = useState(false)

    const handleFileInput = (e) => {
        e.preventDefault()
        getPlantInfo()
        setLoading(true)
    }

    const getPlantInfo = async () => {
        try {
            const {data} = await axios.post(`/api/identify-plant`, { file })
            setImageUrl(data.imageUrl)
            setPlantSuggestion(data.plantSuggestions)
            setLoading(false)
        } catch (error) {
            console.log('Error',error);
        }
    }

    // console.log(imageUrl);
    console.log(plantSuggestion);

    
    return (
        <div>
            <Form onSubmit={handleFileInput} className='pi-form'>
                <FileBase64 type="file" multiple={false} onDone={
                    ({ base64 }) => setFile(base64)} />

                <Button type='submit' className='bg-col-primary'>
              Upload
            </Button>
            </Form>

            {loading ? <Loader /> : (
                <>
                    {imageUrl &&                
                        <div className="pi-mainImg">
                        <img src={imageUrl} alt="pi-img" />
                        </div>
                    }

                    {plantSuggestion &&
                        <div>
                        {plantSuggestion.map(plant => (
                            <Row key={plant.id}  className="pi-plants">
                                <Col className="pi-plants-info" md={5} sm={12}>
                                    <div className="pi-plants-img" >
                                        {plant.similar_images.map(i =>
                                        (
                                                <img src={i.url} alt="plant-img" key={i.id} />
                                        )
                                        )}
                                    </div>
                                </Col>
                                <Col md={5} sm={6} className="pi-col-2">
                                    <div className='pi-card-info'>
                                        <h3 className="pi-name">{plant.plant_name}</h3>
                                        <div><span>Scientific Name:</span>{plant.plant_details.scientific_name}</div>
                                        <div><span>Genus:</span>{plant.plant_details.structured_name.genus}</div>
                                        <div><span>Species:</span>{plant.plant_details.structured_name.species}</div>
                                        
                                        <div className="pi-col-2-info">
                                            <PIDetailsModal name={plant.plant_name} authority={plant.plant_details.name_authority} common_names={plant.plant_details.common_names} synonyms={plant.plant_details.synonyms} taxonomy={plant.plant_details.taxonomy} desc={plant.plant_details.wiki_description.value} />
                                            <a href={plant.plant_details.url}><i className="fas fa-globe"></i> </a>
                                        </div>
                                    </div>
                                </Col>
                                <Col md={2} sm={6}>
                                    <div className="pi-probability">
                                        <p>{`${((plant.probability).toFixed(2)) * 100} %`}</p>
                                    </div>
                                    
                                </Col>
                            </Row>
                        ))}
                        </div>
                    
                    }

                </>

            )}
            
            
        </div>
    )
}

export default PlantIdentify
