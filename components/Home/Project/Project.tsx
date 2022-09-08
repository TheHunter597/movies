import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Project.module.scss";
import { useContext } from "react";
import context from "../../../context/context";
interface props {
  data: {
    name: string;
    description: string;
    mainImage: StaticImageData;
    url: string;
    special?: string;
  };
}

function Project(props: props) {
  const { data } = props;
  const { name, description, mainImage, url, special } = data;
  const contextData = useContext(context) as { phoneUser: boolean };
  const { phoneUser } = contextData;
  const router = useRouter();
  return (
    <div className={styles["Project"]}>
      <div className={styles["Project__content"]}>
        {special && !phoneUser ? (
          <div className={styles["Project__special"]}>{special}</div>
        ) : (
          ""
        )}
        <Image
          width={1000}
          height={!phoneUser ? 450 : 800}
          src={mainImage}
          alt="Main project image"
        />
        <h3 className={styles["Project__title"]}>{name}</h3>
        <p className={styles["Project__description"]}>{description}</p>
        <div className={styles["Project__info"]}>
          <button>
            <Link href={url}>
              <a target="_blank" rel="noopener noreferrer">
                Visit the website
              </a>
            </Link>
          </button>
          <button onClick={() => router.push(`/${name}`)}>More Info</button>
        </div>
      </div>
    </div>
  );
}

export default Project;
