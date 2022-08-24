import Navbar from "../Navbar/Navbar";
import styles from "../../styles/app.module.scss";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";

interface props {
  children: JSX.Element | JSX.Element[];
}

function Layout(props: props) {
  let [darkmode, setDarkMode] = useState(false);
  return (
    <div className={`${styles.App}  ${darkmode ? styles.root : styles.dark}`}>
      <Head>
        <title>Cima</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        ></meta>
      </Head>
      <Navbar setDarkMode={setDarkMode} darkmode={darkmode} />
      {props.children}
    </div>
  );
}

export default Layout;
