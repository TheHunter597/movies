import { fetchData } from "../utilits/fetchData";

function streamingServicesOptions(id: string) {
  return {
    params: {
      country: "us",
      imdb_id: id,
      output_language: "en",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_MAIN_API_KEY,
      "X-RapidAPI-Host": "streaming-availability.p.rapidapi.com",
    },
  };
}

export let getStreamingData = async (id: string) => {
  let data = await fetchData(
    "https://streaming-availability.p.rapidapi.com/get/basic",
    streamingServicesOptions(id)
  );
  return data;
};
