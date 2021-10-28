import axios from 'axios'
import React, { useState } from 'react'
import notFound from '../../images/not.svg'
import '../../styles/plant-search.css'
import Loader from '../Ecommerce/Loader'
import PlantSearchCard from './PlantSearchCard'

function PlantSearch() {

    const [searchTerm, setSearchTerm] = useState("")
    const [result, setResult] = useState([])
    const [found,setFound] = useState(true)
    const [loading,setLoading] = useState(false)

    const plantSearchAPI = "https://openfarm.cc/api/v1/crops"

    const handlePlantSearch = (e) => {
        e.preventDefault()
        console.log(searchTerm);
        setLoading(true)
        fetchPlant(searchTerm)
    }
    
    const fetchPlant = async (plant) => {
        const { data } = await axios.get(`${plantSearchAPI}?filter=${plant}`)
        
        if (data?.data.length === 0) {
            setFound(false)
        }
        else {
            setResult(data.data)
            setFound(true)
        }
        setLoading(false)
    }
    return (
        <>
            <form onSubmit={handlePlantSearch}>
                <div className="wrap">
                    <div className="search">                    
                        <input type="text" className="searchTerm" placeholder="What plant are you looking for?" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <button type="submit" className="searchButton">                        
                            <i className="fa fa-search"></i>                        
                        </button>                    
                    </div>                
                </div>
            </form>

            {loading ? <Loader /> :
                (
                    <div>
                        {found ?
                            <PlantSearchCard data={result} />
                            :
                            <div>
                                <img src={notFound} alt="not-found" className="search-nf" />
                                <h4 className="search-text-nf" >No Result</h4>
                            </div>
                        }
                    </div>
                )
            }
        </>
        
    )
}

export default PlantSearch
