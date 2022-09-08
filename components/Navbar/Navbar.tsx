import styles from "./Navbar.module.scss";
import context from "../../context/context";
import { useContext, useState, useEffect } from "react";
import { state, actionType } from "../../utilits/types";
import { BiSun } from "react-icons/bi";
import { BsMoonFill } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/router";

function Navbar(props: { setDarkMode: Function; darkmode: boolean }) {
  const data = useContext(context) as { state: state; dispatch: Function };
  let { darkmode, setDarkMode } = props;
  let { state, dispatch } = data;
  const [showHeader, setShowHeader] = useState(false);
  const router = useRouter();
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
          <>
            <ul>
              <li
                onClick={() => {
                  setShowHeader(false);
                  router.push("/");
                }}
              >
                Home
              </li>
              <li
                onClick={() => {
                  setShowHeader(false);

                  router.push(
                    state.chosenMovie.id
                      ? `/currentResult/${state.chosenMovie.id}`
                      : "/#Search"
                  );
                }}
              >
                Current result
              </li>
            </ul>
          </>
        </div>
      ) : (
        ""
      )}
    </>
  );
  return (
    <div className={styles.Navbar}>
      {!state.phoneUser ? (
        <div className={styles.Navbar__headers}>
          <ul>
            <li onClick={() => router.push("/")}>Home</li>
            <li
              onClick={() => {
                router.push(
                  state.chosenMovie.id
                    ? `/currentResult/${state.chosenMovie.id}`
                    : "/#Search"
                );
              }}
            >
              Current result
            </li>
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
        </div>
      ) : (
        phoneNavbar
      )}
    </div>
  );
}

export default Navbar;
