import styles from "./ActorsElement.module.scss";

function ActorsElement(props: {
  data: {
    results: {
      knownForTitles: string;
      birthYear: number;
      primaryName: string;
      primaryProfession: string;
    };
  };
  image: string;
}) {
  if (props.data.results != undefined) {
    let { data, image } = props;
    let { results } = data;
    let { primaryName, primaryProfession } = results;
    return (
      <div className={styles.Actor}>
        <img
          src={image ? image : "undefined"}
          alt=""
          className={styles.Actor__image}
        />
        <div className={styles.Actor__info}>
          <h4>{primaryName ? primaryName : "undefined"}</h4>
          <h5>{primaryProfession ? primaryProfession : "undefined"}</h5>
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default ActorsElement;
