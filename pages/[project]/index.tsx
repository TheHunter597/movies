import Image, { StaticImageData } from "next/image";
import styles from "./ProjectPage.module.scss";
import { projectsData } from "../../data/projectsData";
import { useContext } from "react";
import context from "../../context/context";
import Head from "next/head";

interface props {
  projectData: {
    name: string;
    description: string;
    mainImage: StaticImageData;
    url: string;
    images: StaticImageData[];
    details: string[];
  };
}

function ProjectPage(props: props) {
  const { projectData } = props;
  const { name, description, mainImage, images, url, details } = projectData;
  const contextData = useContext(context) as {
    fixNavbar: boolean;
    phoneUser: boolean;
  };

  const { fixNavbar, phoneUser } = contextData;
  const detailsInfo = details.map((info) => {
    const firstWord = info.split(" ")[0];
    return (
      <li
        key={info}
        className={
          firstWord === "Currently" || firstWord === "Next"
            ? styles["ProjectPage__details--active"]
            : ""
        }
      >
        {info}
      </li>
    );
  });
  const gallery = images.map((image, index) => {
    return (
      <div key={index}>
        <Image src={image} width={700} height={450} alt="image" />
      </div>
    );
  });
  return (
    <div
      className={styles["ProjectPage"]}
      style={fixNavbar ? { marginTop: "8rem" } : { marginTop: "0rem" }}
    >
      <Head>
        <title>{name + " " + "Project"}</title>
      </Head>
      <div className={styles["ProjectPage__image"]}>
        <Image
          src={mainImage}
          height={!phoneUser ? 600 : 900}
          width={1200}
          alt="main image"
        />
      </div>
      <div className={styles["ProjectPage__content"]}>
        <div className={styles["ProjectPage__info"]}>
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
        <p className={styles["ProjectPage__details"]}>
          <ul>{detailsInfo}</ul>
        </p>
        <h3 className={styles["ProjectPage__galleryHeader"]}>Gallery</h3>
        <div className={styles["ProjectPage__gallery"]}> {gallery}</div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = projectsData.map((project) => {
    return {
      params: {
        project: project.name,
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps(context: { params: { project: string } }) {
  const project = projectsData.find(
    (project) => project.name === context.params.project
  );
  return {
    props: {
      projectData: project,
    },
  };
}

export default ProjectPage;
