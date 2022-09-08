import styles from "./Header.module.scss";

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Header__title}>
        <h1 className={styles.Header__header}>
          <span className={styles["header-primary"]}>Cinema for you</span>
          <span className={styles["header-secondary"]}>
            A place where you find anything about movies .
          </span>
        </h1>
      </div>
      <div className={styles.Header__content}>
        <p>
          Search for a movie, series,genres or even a single episode by the name
          with the ability to add them to your favourite list and also favourite
          actors
        </p>
        <button
          className={`${styles["button-primary"]} ${styles.Header__button}`}
          onClick={() => window.scrollTo(0, 600)}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
export default Header;
