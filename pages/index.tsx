import Head from "next/head";
import Contact from "../components/Home/Contact/Contact";
import Header from "../components/Home/Header/Header";
import Projects from "../components/Home/Projects/Projects";
import Skills from "../components/Home/Skills/Skills";
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles["Home"]}>
      <Head>
        <title>Mohamed Hossam</title>
      </Head>
      <Header />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}

export default Home;
