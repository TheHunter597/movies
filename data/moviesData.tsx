import { errorThrower } from "../utilits/errorThrower";
import { fetchData } from "../utilits/fetchData";
import { searchTypes } from "../utilits/types";

function getMoviesInfoOptions(movieName: string, page?: number) {
  return {
    params: {
      apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
      s: movieName,
      page: page,
    },
  };
}

export let getMoviesInfo = async (
  type: string,
  movieName: string,
  page?: number
) => {
  if (type === searchTypes.title) {
    try {
      let data = await fetchData(
        "https://www.omdbapi.com/",
        getMoviesInfoOptions(movieName.trim(), page)
      );
      return data;
    } catch (e: any) {
      errorThrower("error occured in fetching all movies data", e);
    }
  }
  return;
};

function getChosenMovieInfo(id: string) {
  return {
    params: {
      apikey: process.env.NEXT_PUBLIC_OMDB_API_KEY,
      i: id,
    },
  };
}

export let getChosenMovieData = async (id: string) => {
  try {
    let data = await fetchData(
      "https://www.omdbapi.com/",
      getChosenMovieInfo(id)
    );
    return data;
  } catch (e) {
    errorThrower("error accoured in fetching chosen movie data", e);
  }
};
