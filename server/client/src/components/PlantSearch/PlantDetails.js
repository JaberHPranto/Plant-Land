import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import '../../styles/plant-search.css';

function PlantDetails({ match }) {
    
    const [plantData, setPlantData] = useState("")
    const plantSearchAPI = "https://openfarm.cc/api/v1/crops"
    useEffect(() => {
        async function fetchPlant() {
            const res = await axios.get(`${plantSearchAPI}/${match.params.id}`)
            setPlantData(res.data.data)
        }
        fetchPlant()

    }, [match])
    return (
        <div>
            {plantData && (
                <Table striped bordered style={{marginTop:'-1.5rem'}}>
                    <thead>
                    </thead>
                    <tbody className='ps-table-info'>
                            <tr> 
                                <td>Name</td>
                                <td>{plantData.attributes.name}</td>
                            </tr>
                            <tr>
                                <td>Binomial Name</td>
                                <td>{plantData.attributes.binomial_name}</td>
                            </tr>
                            <tr>
                                <td>Taxon</td>
                                <td>{plantData.attributes.taxon}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{plantData.attributes.description}</td>
                            </tr>
                            <tr>
                                <td>Sun Requirements</td>
                                <td>{plantData.attributes.sun_requirements}</td>
                            </tr>
                            <tr>
                                <td>Sowing Method</td>
                                <td>{plantData.attributes.sowing_method}</td>
                            </tr>
                            <tr>
                                <td>Growing Degree Days</td>
                                <td>{plantData.attributes.growing_degree_days}</td>
                            </tr>
                            <tr>
                                <td>Row Spacing</td>
                                <td>{plantData.attributes.row_spacing} cm</td>
                            </tr>
                            <tr>
                                <td>Height</td>
                                <td>{plantData.attributes.height} cm</td>
                            </tr>
                       
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default PlantDetails
