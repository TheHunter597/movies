import styles from "./Navbar.module.scss";
import context from "../../context/context";
import { useContext, useState, useEffect } from "react";
import { state, actionType } from "../../utilits/types";
import { BiSun } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import Link from "next/link";
import { FaBars } from "react-icons/fa";

function Navbar(props: { setDarkMode: Function; darkmode: boolean }) {
  const data = useContext(context) as { state: state; dispatch: Function };
  let { darkmode, setDarkMode } = props;
  let { state, dispatch } = data;
  const [showHeader, setShowHeader] = useState(false);
  useEffect(() => {
    window.innerWidth < 600
      ? dispatch({ type: actionType.CHANGE_PHONE_USER, value: true })
      : dispatch({ type: actionType.CHANGE_PHONE_USER, value: false });
    window.addEventListener("resize", () =>
      window.innerWidth < 600
        ? dispatch({ type: actionType.CHANGE_PHONE_USER, value: true })
        : dispatch({ type: actionType.CHANGE_PHONE_USER, value: false })
    );
    return () => {
      window.removeEventListener("resize", () =>
        window.innerWidth < 600
          ? dispatch({ type: actionType.CHANGE_PHONE_USER, value: true })
          : dispatch({ type: actionType.CHANGE_PHONE_USER, value: false })
      );
    };
  }, []);
  let phoneNavbar = (
    <>
      <ul className={styles.Navbar__phone}>
        <li
          className={`${styles.Navbar__darkmodeToggler} ${
            darkmode ? styles.darkmode__active : styles.darkmode__inactive
          }`}
          onClick={() => setDarkMode((prev: boolean) => !prev)}
        >
          <BsMoonFill />
          <BiSun />
        </li>
        <li
          onClick={() => setShowHeader((prev) => !prev)}
          className={`${styles.Navbar__bars}  ${
            showHeader ? styles.Navbar__bars_active : ""
          }`}
        >
          <FaBars />
        </li>
      </ul>
      {showHeader ? (
        <div className={styles.Navbar__headers}>
          <ul>
            <Link href="/">
              <a onClick={() => setShowHeader(false)}>Home</a>
            </Link>
            <Link
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
              <a
                onClick={() => {
                  setShowHeader(false);
                  dispatch({ type: actionType.CHANGE_FROM_OUTSIDE_LINK });
                  !state.chosenMovie.id
                    ? window.scrollTo(0, 1000)
                    : doNothing();
                }}
              >
                {" "}
                Current result
              </a>
            </Link>
          </ul>
          <ul>
            <Link href="/favMovies">
              <a onClick={() => setShowHeader(false)}>Favourites list</a>
            </Link>
          </ul>
        </div>
      ) : (
        ""
      )}
    </>
  );
  function doNothing() {
    return;
  }
  return (
    <div className={styles.Navbar}>
      {!state.phoneUser ? (
        <div className={styles.Navbar__headers}>
          <ul>
            <Link href="/">Home</Link>
            <Link
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
              <a
                onClick={() => {
                  dispatch({ type: actionType.CHANGE_FROM_OUTSIDE_LINK });
                  !state.chosenMovie.id
                    ? window.scrollTo(0, 1000)
                    : doNothing();
                }}
              >
                {" "}
                Current result
              </a>
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
      ) : (
        phoneNavbar
      )}
    </div>
  );
}

export default Navbar;
