import { fetchData } from "../utilits/fetchData"

function streamingServicesOptions(id:string){
    return {
        params: {
            country: 'us', 
            imdb_id: id,
            output_language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': '9e242bb636msha73a426bc65c101p1864fdjsn2dcb3ec2059b',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    }
}

export let getStreamingData =async (id:string) => {
    let data = await fetchData("https://streaming-availability.p.rapidapi.com/get/basic",streamingServicesOptions(id))
    return data
}