function YoutubeVideo(props:{data:{title:string,videoId:string,thumbnails:{url:string}[]}}) {
    if (props.data !=undefined) {
        let {data} = props
        let {videoId,thumbnails,title} = data
        let url = `https://www.youtube.com/watch?v=${videoId}`
        return ( 
            <div>
                <a href={url} target="_blank">
                    <img src={thumbnails[0].url} alt="" />
                </a>
                <h4>
                    {title}
                </h4>
            </div>
         );
    }
    return <div></div>
}

export default YoutubeVideo;