import * as React from "react";

import { state, reducerAction, actionType } from "../utilits/types";

import { getChosenMovieData } from "../data/moviesData";
import { getYoutubeVideos } from "../data/getMovieYoutube";
import { getStreamingData } from "../data/getStreamingData";
import { getActorsInfo, getActorsData, getActorImage } from "../data/getActors";
import { useRouter } from "next/router";

let context = React.createContext({});

function reducer(state: state, action: reducerAction): state {
  switch (action.type) {
    case actionType.CHANGE_RESULT:
      return { ...state, result: { ...state.result, data: action.value } };
    case actionType.NEXT_PAGE:
      return {
        ...state,
        result: { ...state.result, page: (state.result.page += 1) },
      };
    case actionType.PREVOIUS_PAGE:
      return {
        ...state,
        result: {
          ...state.result,
          page: state.result.page - 1 <= 0 ? 1 : state.result.page - 1,
        },
      };
    case actionType.REST_PAGES:
      return { ...state, result: { ...state.result, page: 1 } };
    case actionType.CHOSEN_MOVIE_ID:
      return {
        ...state,
        chosenMovie: { ...state.chosenMovie, id: action.value },
      };
    case actionType.CHANGE_CHOSEN_MOVIE_DATA:
      return {
        ...state,
        chosenMovie: { ...state.chosenMovie, data: action.value },
      };
    case actionType.CHANGE_YOUTUBE_DATA:
      return {
        ...state,
        chosenMovie: { ...state.chosenMovie, youtubeVideos: action.value },
      };
    case actionType.CHANGE_ACTORS_INFO:
      return {
        ...state,
        chosenMovie: {
          ...state.chosenMovie,
          actors: { ...state.chosenMovie.actors, actorsInfo: action.value },
        },
      };
    case actionType.CHANGE_ACTOR_DATA:
      return {
        ...state,
        chosenMovie: {
          ...state.chosenMovie,
          actors: {
            ...state.chosenMovie.actors,
            actorsData: [...state.chosenMovie.actors.actorsData, action.value],
          },
        },
      };
    case actionType.CHANGE_ACTOR_IMAGE:
      return {
        ...state,
        chosenMovie: {
          ...state.chosenMovie,
          actors: {
            ...state.chosenMovie.actors,
            actorsImages: [
              ...state.chosenMovie.actors.actorsImages,
              action.value,
            ],
          },
        },
      };
    case actionType.CHANGE_FROM_OUTSIDE_LINK:
      return { ...state, fromOutsideLink: false };
    case actionType.ADD_FAV_MOVIE:
      return { ...state, favsMovies: [...state.favsMovies, action.value] };
    case actionType.REMOVE_FAV_MOVIE:
      return { ...state, favsMovies: action.value };
    case actionType.CHANGE_STREAMING_SERVICES:
      return {
        ...state,
        chosenMovie: { ...state.chosenMovie, streamingServices: action.value },
      };
    case actionType.REST_ACTORS:
      return {
        ...state,
        chosenMovie: {
          ...state.chosenMovie,
          actors: { actorsInfo: [], actorsData: [], actorsImages: [] },
        },
      };
    default:
      return state;
  }
}

export let ContextProvider = (props: { children: any }) => {
  let router = useRouter();
  let [state, dispatch] = React.useReducer(reducer, {
    result: {
      page: 1,
      data: [],
    },
    chosenMovie: {
      id: "",
      streamingServices: {},
      data: {},
      youtubeVideos: [],
      actors: {
        actorsInfo: [{}],
        actorsData: [{}],
        actorsImages: [""],
      },
    },
    favsMovies: [{}],
    fromOutsideLink: true,
  } as state);

  let getAllData = async (fromOutside: boolean, id: string) => {
    /// sets the id of the chosen movie and resets actors data to empty array
    dispatch({ type: actionType.CHOSEN_MOVIE_ID, value: id });
    dispatch({ type: actionType.REST_ACTORS });
    /// get data about the movie
    let movieData = await getChosenMovieData(id);
    dispatch({
      type: actionType.CHANGE_CHOSEN_MOVIE_DATA,
      value: movieData?.data,
    });
    /// get data about the actors

    let actorsData = await getActorsInfo("movie", id);
    dispatch({
      type: actionType.CHANGE_ACTORS_INFO,
      value: actorsData.data.actors.slice(0, 2),
    });

    /// get data about the streaming avaliabilty is it available in netflix,hbo or disney
    let streamingData = await getStreamingData(id);
    dispatch({
      type: actionType.CHANGE_STREAMING_SERVICES,
      value: streamingData.data.streamingInfo,
    });
    /// get some youtube videos to display
    let youtubeData = await getYoutubeVideos(movieData?.data.Title);
    dispatch({
      type: actionType.CHANGE_YOUTUBE_DATA,
      value: youtubeData?.data.contents,
    });
    /// after actors data arrive a call to another api is going to be done to get more data about the actor like image from google images api
    actorsData.data.actors
      .slice(0, 2)
      .map((entry: { id: string; name: string }, index: number) => {
        setTimeout(async () => {
          let actorData = await getActorsData(entry.id);
          let actorImage = await getActorImage(entry.name);
          dispatch({
            type: actionType.CHANGE_ACTOR_IMAGE,
            value: actorImage.data.response.images[0].image.url,
          });
          dispatch({
            type: actionType.CHANGE_ACTOR_DATA,
            value: actorData.data,
          });
        }, index * 500);
      });

    /// fromOutside: if the user typed the name of the movie in the home page input field
    /// then chose from the list a movie then he is not coming from outside
    /// whereas if the user typed the link of the movie directly into the search bar without being directed from home page he is coming from outside
    /// like if he wrote http://localhost:3000/current/movie/tt1981115 directly into the search bar

    /// user is going to get navigated to the page
    router.push(`/currentResult/${movieData?.data.imdbID}`);
  };
  return (
    <context.Provider value={{ state, dispatch, getAllData }}>
      {props.children}
    </context.Provider>
  );
};

export default context;
