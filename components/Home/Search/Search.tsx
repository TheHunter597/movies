import { useContext, useRef, useState } from "react";
import context from "../../../context/context";
import styles from "./Search.module.scss";
import {
  state,
  dispatchType,
  actionType,
  searchTypes,
  movieInfo,
} from "../../../utilits/types";
import { getMoviesInfo } from "../../../data/moviesData";
import { debouncer } from "../../../utilits/debouncer";
import DropdownElement from "../../../components/DropdownElement";
function Search() {
  const [showScrollButtons, setShowScrollButtons] = useState(false);

  let input = useRef<HTMLInputElement>(null);
  let moviesScroll = useRef<HTMLDivElement>(null);

  let data = useContext(context) as { state: state; dispatch: dispatchType };
  let { state, dispatch } = data;

  let result = state.result.data ? (
    state.result.data.map((movie: movieInfo) => (
      <DropdownElement movie={movie} key={movie.imdbID} />
    ))
  ) : (
    <div className={styles.Search__error}>
      <p>Movie, series not found or connection timed out pls try again :) </p>
    </div>
  );

  return (
    <div className={styles.Search} id="Search">
      <h3 className={`${styles.Search__title} header-secondary`}>
        Type the name of the movie or a series name
      </h3>
      <div
        className={styles.Search__content}
        onMouseEnter={() => setShowScrollButtons(true)}
        onMouseLeave={() => setShowScrollButtons(false)}
      >
        <div className={styles.Search__input}>
          <input
            type="text"
            onChange={debouncer(async () => {
              let data = await getMoviesInfo(
                searchTypes.title,
                input.current!.value,
                1
              );
              dispatch({
                type: actionType.CHANGE_RESULT,
                value: data?.data.Search,
              });
              dispatch({ type: actionType.REST_PAGES });
              setTimeout(() => window.scrollTo(0, 2000), 300);
            }, 700)}
            ref={input}
          />
        </div>

        <div className={styles.Search__dropdown} ref={moviesScroll}>
          {result}
        </div>

        {showScrollButtons && state.result.data?.length ? (
          <div className={styles.Search__scroll}>
            <button
              className={styles.Search__scroll__left}
              onClick={() =>
                moviesScroll.current
                  ? (moviesScroll.current.scrollLeft -= 700)
                  : ""
              }
            >
              &larr;
            </button>
            <button
              className={styles.Search__scroll__right}
              onClick={() =>
                moviesScroll.current
                  ? (moviesScroll.current.scrollLeft += 700)
                  : ""
              }
            >
              &rarr;
            </button>
          </div>
        ) : (
          ""
        )}

        {state.result.data?.length ? (
          <div className={styles.Search__changePage}>
            <button
              onClick={debouncer(() => {
                dispatch({ type: actionType.PREVOIUS_PAGE });
                setTimeout(async () => {
                  let data = await getMoviesInfo(
                    searchTypes.title,
                    input.current!.value,
                    state.result.page
                  );
                  dispatch({
                    type: actionType.CHANGE_RESULT,
                    value: data?.data.Search,
                  });
                }, 100);
              }, 700)}
              className={styles.Search__changePage__previous}
            >
              Prevoius page
            </button>

            <button
              onClick={debouncer(() => {
                dispatch({ type: actionType.NEXT_PAGE });
                setTimeout(async () => {
                  let data = await getMoviesInfo(
                    searchTypes.title,
                    input.current!.value,
                    state.result.page
                  );
                  dispatch({
                    type: actionType.CHANGE_RESULT,
                    value: data?.data.Search,
                  });
                }, 100);
              }, 700)}
              className={styles.Search__changePage__next}
            >
              Next page
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Search;
