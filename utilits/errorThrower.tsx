export let errorThrower = (place:string,info:any):never=>{
    throw new Error(`${place}  ${info}`)
}

