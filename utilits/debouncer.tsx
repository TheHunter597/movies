

export let debouncer= (fn:Function,delay:number)=>{
    let timer:any
    return ()=>{
        clearTimeout(timer)
        timer = setTimeout(fn,delay)
    }
}