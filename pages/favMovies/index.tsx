import { useContext, useRef, useState } from "react";
import DropdownElement from "../../components/DropdownElement";
import context from "../../context/context";
import { state } from "../../utilits/types";
import styles from "./FavMovies.module.scss";

function FavMovies() {
  let content = useContext(context) as { state: state; dispatch: Function };
  let { state } = content;
  let { favsMovies } = state;
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  let moviesScroll = useRef<HTMLDivElement>(null);
  let result = favsMovies.slice(1).map((entry) => {
    return (
      <DropdownElement
        movie={entry.data}
        isInMoviesList={true}
        key={entry.data.Title}
      />
    );
  });
  return (
    <section
      className={styles.favMovies}
      onMouseEnter={() => setShowScrollButtons(true)}
      onMouseLeave={() => setShowScrollButtons(false)}
    >
      <h4 className={styles.favMovies__title}>Yout favourites list</h4>
      <div className={styles.favMovies__content} ref={moviesScroll}>
        {result.length < 1 ? (
          <div className={styles.favMovies__noMovies}>
            <h4>No movies were added to favs list</h4>
            <p>
              If you want to add a something use the heart on the right side of
              the movie or series page
            </p>
          </div>
        ) : (
          result
        )}
      </div>
      {showScrollButtons && state.favsMovies.length > 1 ? (
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
    </section>
  );
}

export default FavMovies;
