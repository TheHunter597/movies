import { fetchData } from "../utilits/fetchData";

function youtubeOptions(entry: string) {
  return {
    params: {
      query: `${entry} trailer`,
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MAIN_API_KEY,
      "X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
    },
  };
}

export let getYoutubeVideos = async (entry: string) => {
  let data = await fetchData(
    "https://youtube-search-and-download.p.rapidapi.com/search",
    youtubeOptions(entry)
  );
  return data;
};
