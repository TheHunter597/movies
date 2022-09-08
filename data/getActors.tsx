import { fetchData } from "../utilits/fetchData";
function getActorsInfoOptions(entry: string) {
  return {
    params: { id: entry },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_SECONDARY_API_KEY,
      "X-RapidAPI-Host": "movie-details1.p.rapidapi.com",
    },
  };
}

function getActorImageOptions(entry: string) {
  return {
    params: { q: entry },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MAIN_API_KEY,
      "X-RapidAPI-Host": "google-image-search1.p.rapidapi.com",
    },
  };
}

export function getActorsInfo(type: "movie", id: string) {
  let data = fetchData(
    `https://movie-details1.p.rapidapi.com/imdb_api/${type}`,
    getActorsInfoOptions(id)
  );
  return data;
}

export function getActorsData(id: string) {
  let data = fetchData(`https://moviesdatabase.p.rapidapi.com/actors/${id}`, {
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MAIN_API_KEY,
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  });
  return data;
}

export function getActorImage(entry: string) {
  let data = fetchData(
    "https://google-image-search1.p.rapidapi.com/v2/",
    getActorImageOptions(entry)
  );
  return data;
}
