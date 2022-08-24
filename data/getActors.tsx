import { fetchData } from "../utilits/fetchData";
let apiKey: "9e242bb636msha73a426bc65c101p1864fdjsn2dcb3ec2059b";
function getActorsInfoOptions(entry: string) {
  return {
    params: { id: entry },
    headers: {
      "X-RapidAPI-Key": "567fa121e1msh24c338195b2b806p13eac6jsn525a1894f435",
      "X-RapidAPI-Host": "movie-details1.p.rapidapi.com",
    },
  };
}

function getActorImageOptions(entry: string) {
  return {
    params: { q: entry },
    headers: {
      "X-RapidAPI-Key": "9e242bb636msha73a426bc65c101p1864fdjsn2dcb3ec2059b",
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
      "X-RapidAPI-Key": "9e242bb636msha73a426bc65c101p1864fdjsn2dcb3ec2059b",
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
