import { fetchData } from "../utilits/fetchData";

function youtubeOptions (entry:string){
    return {
        params: {
        query: entry
        },
        headers: {
        'X-RapidAPI-Key': '9e242bb636msha73a426bc65c101p1864fdjsn2dcb3ec2059b',
        'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
        }
    }
}

export let getYoutubeVideos =async(entry:string)=>{
    let data = await fetchData('https://youtube-search-and-download.p.rapidapi.com/search',youtubeOptions(entry))
    return data
}