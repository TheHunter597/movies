import { useContext, useState } from "react";

import { movieInfo, state, actionType } from "../utilits/types";
import styles from "./DropdownElement.module.scss";
import context from "../context/context";
import ReactLoading from "react-loading";

function DropdownElement(props: {
  movie: movieInfo;
  isInMoviesList?: boolean;
}) {
  let { movie, isInMoviesList } = props;
  let data = useContext(context) as {
    dispatch: Function;
    state: state;
    getAllData: Function;
  };
  let { state, getAllData, dispatch } = data;
  let [loader, setLoader] = useState(false);
  let [removeMovie, setRemoveMovie] = useState(false);
  return (
    <div
      className={`${styles.dropdown__content} ${
        state.chosenMovie.id === movie.imdbID ? styles.active : ""
      }`}
      onClick={async () => {
        if (!removeMovie) {
          setLoader(true);
          getAllData(false, movie.imdbID);
          dispatch({ type: actionType.CHANGE_FROM_OUTSIDE_LINK });
          setTimeout(async () => {
            setLoader(false);
          }, 6000);
        }
      }}
    >
      {isInMoviesList ? (
        <div className={styles.dropdown__removeMovie}>
          <p
            onClick={() => {
              setRemoveMovie(true);
              let newFavList = state.favsMovies.filter((entry) => {
                return entry.id != movie.imdbID;
              });
              dispatch({
                type: actionType.REMOVE_FAV_MOVIE,
                value: newFavList,
              });
            }}
          >
            X
          </p>
        </div>
      ) : (
        ""
      )}

      {!loader ? (
        <div className={styles.dropdown__image}>
          <img src={movie.Poster} alt="Poster not found" />
        </div>
      ) : (
        <div className={styles.dropdown__loader}>
          <ReactLoading
            type={"spin"}
            width={"12rem"}
            height={"12rem"}
            color={"--tertiary-text-color"}
          />
        </div>
      )}
      <div className={styles.dropdown__Info}>
        <h3>
          {movie.Title}({movie.Year})
        </h3>
      </div>
    </div>
  );
}

export default DropdownElement;
