export enum searchTypes {
  title = "title",
}

export enum actionType {
  CHANGE_RESULT = "CHANGE_RESULT",
  CHANGE_SEARCH_TERM = "CHANGE_SEARCH_TERM",
  NEXT_PAGE = "NEXT_PAGE",
  PREVOIUS_PAGE = "PREVIOUS_PAGE",
  REST_PAGES = "REST_PAGES",
  CHOSEN_MOVIE_ID = "CHOSEN_MOVIE_ID",
  CHANGE_CHOSEN_MOVIE_DATA = "CHANGE_CHOSEN_MOVIE_DATA",
  CHANGE_YOUTUBE_DATA = "CHANGE_YOUTUBE_DATA",
  CHANGE_ACTORS_INFO = "CHANGE_ACTORS_DATA",
  CHANGE_ACTOR_DATA = "CHANGE_ACTOR_DATA",
  REST_ACTORS_DATA = "REST_ACTORS_DATA",
  CHANGE_ACTOR_IMAGE = "CHANGE_ACTOR_IMAGE",
  REST_ACTORS_IMAGES = "REST_ACTORS_IMAGES",
  CHANGE_FROM_OUTSIDE_LINK = "CHANGE_FROM_OUTSIDE_LINK",
  ADD_FAV_MOVIE = "ADD_FAV_MOVIE",
  REMOVE_FAV_MOVIE = "REMOVE_FAV_MOVIE",
  CHANGE_STREAMING_SERVICES = "CHANGE_STREAMING_SERVICES",
  REST_ACTORS = "REST_ACTORS",
  CHANGE_PHONE_USER = "CHANGE_PHONE_USER",
}

export interface state {
  result: {
    page: number;
    data: [];
  };
  chosenMovie: {
    id: string;
    streamingServices: {
      disney?: { us: { link: string } };
      netflix?: { us: { link: string } };
      hbo?: { us: { link: string } };
    };
    data: {
      Title: string;
      Poster: string;
      Year: string;
      Genre: string;
      Director: string;
      Type: string;
      imdbID: string;
      BoxOffice: string;
      Actors: string;
      Awards: string;
      Plot: string;
      Writer: string;
      Ratings: { Source: string; Value: string }[];
      Metascore: string;
      imdbRating: string;
    };
    youtubeVideos: [];
    actors: {
      actorsInfo: { id: string; name: string }[];
      actorsData: {
        results: {
          birthYear: number;
          knownForTitles: string;
          primaryName: string;
          primaryProfession: string;
        };
      }[];
      actorsImages: string[];
    };
  };
  favsMovies: {
    id: string;
    data: { Title: string; imdbID: string; Poster: string; Year: number };
  }[];
  fromOutsideLink: boolean;
  phoneUser: boolean;
}

export interface movieInfo {
  Poster: string;
  Title: string;
  Year: number;
  imdbID: string;
}

export interface youtubeData {
  video: {
    videoId: string;
    thumbnails: { url: string }[];
    title: string;
  };
}

export type reducerAction = { type: actionType; value?: any };

export type dispatchType = ({ type, value }: reducerAction) => void;
