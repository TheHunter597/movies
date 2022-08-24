import axios from "axios"

export let fetchData = async(url:string,options?:Object)=>{
    let data = await axios.get(url,options)
    return data
}

