import axios from 'axios';
export const IdentifyPlant = (req, res) => {
    const {file }  = req.body;
    const arr = []
    arr.push(file)
 
    const data = {
    api_key: process.env.PI_API_KEY,
    images:arr,
    modifiers: ["crops_fast", "similar_images"],
    plant_language: "en",
    plant_details: ["common_names",
        "url",
        "name_authority",
        "wiki_description",
        "taxonomy",
        "synonyms"]
};
        const config = {
            headers: {
                'Content-Type': 'application/json',
           }
        }
    axios.post('https://api.plant.id/v2/identify', data, config).then(result => {
        console.log('Success');
        const plantSuggestions = result.data.suggestions
        const imageUrl = result.data.images[0].url
        const isPlantProbability = result.data.is_plant_probability
        // console.log(plantSuggestions);
        // console.log(imageUrl);
        // console.log(isPlantProbability);

        return res.status(200).json({ imageUrl, plantSuggestions, isPlantProbability })

    }).catch(error => {
        console.error('Error: ', error)
        return res.status(500).json({error:"Server Error"})
    })    
}
