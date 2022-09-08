import styles from "./CurrentResult.module.scss";
import { useContext, useEffect } from "react";
import context from "../../context/context";
import { state, youtubeData, actionType } from "../../utilits/types";
import { SiRottentomatoes, SiImdb, SiHbo } from "react-icons/si";
import { RiNetflixFill } from "react-icons/ri";
import YoutubeVideo from "../../components/YoutubeVideos";
import ActorsElement from "../../components/ActorsElement";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import Image from "next/image";
import Head from "next/head";

function CurrentResult() {
  const router = useRouter();
  let id = router.query.id;

  const contextData = useContext(context) as {
    dispatch: Function;
    state: state;
    getAllData: Function;
  };
  let { state, dispatch, getAllData } = contextData;
  let { chosenMovie } = state;
  let { data, youtubeVideos, actors } = chosenMovie;
  let { actorsData, actorsImages } = actors;
  let {
    Poster,
    Title,
    Year,
    Genre,
    Ratings,
    Plot,
    Director,
    Writer,
    imdbRating,
    Awards,
  } = data;

  useEffect(() => {
    const loadPage = async () => {
      if (id && state.fromOutsideLink) {
        dispatch({ type: actionType.CHANGE_FROM_OUTSIDE_LINK, value: false });
        getAllData(true, id);
      }
      return;
    };
    loadPage();
  }, [id, state.fromOutsideLink]);

  const rottenTomato = Ratings?.some(
    (entry) => entry.Source === "Rotten Tomatoes"
  )
    ? Ratings.filter((entry) => entry.Source === "Rotten Tomatoes")
    : "Not available";

  let youtubeElements;

  if (youtubeVideos.length >= 1) {
    youtubeElements = youtubeVideos.slice(0, 6).map((entry: youtubeData) => {
      return <YoutubeVideo data={entry.video} key={entry.video.videoId} />;
    });
  }
  let ActorsElements;
  if (actorsData.length >= 2) {
    ActorsElements = actorsData.map((actor, index) => {
      return (
        <ActorsElement
          data={actor}
          image={actorsImages[index]}
          key={nanoid()}
        />
      );
    });
  }

  let streaming = () => {
    if (
      state.chosenMovie.streamingServices.hasOwnProperty("disney") &&
      state.chosenMovie.streamingServices.disney
    ) {
      return (
        <p>
          Available at
          <br />
          <br />{" "}
          <a
            href={state.chosenMovie.streamingServices.disney.us.link}
            target="_blank"
            rel="noreferrer"
          >
            Disney
          </a>
        </p>
      );
    } else if (
      state.chosenMovie.streamingServices.hasOwnProperty("netflix") &&
      state.chosenMovie.streamingServices.netflix
    ) {
      return (
        <p>
          Available at <br />
          <a
            href={state.chosenMovie.streamingServices.netflix.us.link}
            target="_blank"
            rel="noreferrer"
          >
            <RiNetflixFill />
          </a>
        </p>
      );
    } else if (
      state.chosenMovie.streamingServices.hasOwnProperty("hbo") &&
      state.chosenMovie.streamingServices.hbo
    ) {
      return (
        <p>
          Available at <br />
          <a
            href={state.chosenMovie.streamingServices.hbo.us.link}
            target="_blank"
            rel="noreferrer"
          >
            <SiHbo />
          </a>
        </p>
      );
    } else {
      return <p>No streaming service found</p>;
    }
  };

  return (
    <section className={styles.CurrentResult}>
      <Head>
        <title>{state.chosenMovie.data.Title}</title>
      </Head>
      <div className={styles.CurrentResult__image}>
        <Image height={600} width={350} src={Poster} alt="poster" />
      </div>

      <div className={styles.CurrentResult__info}>
        <h3 className={styles.CurrentResult__title}>{`${Title} ${Year}`}</h3>
        <h4 className={styles.CurrentResult__genres}>{Genre}</h4>
        <p className={styles.CurrentResult__plot}>{Plot}</p>
        <div className={styles.CurrentResult__services}>{streaming()}</div>
      </div>

      <div className={styles.CurrentResult__details}>
        <p>Director: {Director}</p>
        <p>Writers: {Writer}</p>
        <div className={styles.CurrentResult__rating}>
          <div>
            <SiRottentomatoes
              className={styles.CurrentResult__details__rotten}
            />
            <p>
              {" "}
              {typeof rottenTomato != "string"
                ? rottenTomato[0].Value
                : rottenTomato}
            </p>
          </div>
          <div>
            <SiImdb className={styles.CurrentResult__details__imdb} />
            <p> {imdbRating ? imdbRating : "Not available"}</p>
          </div>
        </div>

        <div className={styles.CurrentResult__awards}>
          <p>{Awards}</p>
        </div>
      </div>

      <div className={styles.CurrentResult__youtube}>
        <h3>Some youtube videos related to your choice</h3>
        {youtubeElements}
      </div>
      <h2 className={styles.CurrentResult__mainCast}>Main cast</h2>
      <div className={styles.CurrentResult__actors}>{ActorsElements}</div>
    </section>
  );
}

export default CurrentResult;
