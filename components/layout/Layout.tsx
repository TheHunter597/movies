import Navbar from "../Navbar/Navbar";
import styles from "../../styles/app.module.scss";
import { useContext, useState } from "react";
import context from "../../context/context";
import { state } from "../../utilits/types";
interface props {
  children: JSX.Element | JSX.Element[];
}

function Layout(props: props) {
  let data = useContext(context) as { state: state };
  let [darkmode, setDarkMode] = useState(false);
  return (
    <div className={`${styles.App}  ${darkmode ? styles.root : styles.dark}`}>
      <Navbar setDarkMode={setDarkMode} darkmode={darkmode} />
      {props.children}
    </div>
  );
}

export default Layout;
