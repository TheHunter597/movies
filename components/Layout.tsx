import Navbar from "./Navbar/Navbar";
import styles from "../styles/index.module.scss";
import Head from "next/head";
interface props {
  children: JSX.Element;
}

function Layout(props: props) {
  return (
    <div className={styles.root} style={{ backgroundColor: "var(--bg-color)" }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
      </Head>
      <Navbar />
      {props.children}
    </div>
  );
}

export default Layout;
