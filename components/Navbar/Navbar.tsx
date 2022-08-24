import styles from "./Navbar.module.scss";
import context from "../../context/context";
import { useContext } from "react";
import { state, actionType } from "../../utilits/types";
import { BiSun } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import Link from "next/link";
function Navbar(props: { setDarkMode: Function; darkmode: boolean }) {
  const data = useContext(context) as { state: state; dispatch: Function };
  let { darkmode, setDarkMode } = props;
  let { state, dispatch } = data;
  function doNothing() {
    return;
  }
  return (
    <div className={styles.Navbar}>
      <div className={styles.Navbar__headers}>
        <ul>
          <Link href="/">Home</Link>
          <Link
            onClick={() => {
              dispatch({ type: actionType.CHANGE_FROM_OUTSIDE_LINK });
              !state.chosenMovie.id ? window.scrollTo(0, 1000) : doNothing();
            }}
            href={
              state.chosenMovie.id
                ? `/currentResult/${
                    state.chosenMovie.id != undefined
                      ? `/${state.chosenMovie.id}`
                      : ""
                  }`
                : ""
            }
          >
            Current result
          </Link>
        </ul>
        <ul>
          <li
            className={`${styles.Navbar__darkmodeToggler} ${
              darkmode ? styles.darkmode__active : styles.darkmode__inactive
            }`}
            onClick={() => setDarkMode((prev: boolean) => !prev)}
          >
            <BsMoonFill />
            <BiSun />
          </li>
        </ul>
        <ul>
          <Link href="/favMovies">Movies list</Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
