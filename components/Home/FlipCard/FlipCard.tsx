import Image, { StaticImageData } from "next/image";

import styles from "./Flipcard.module.scss";

interface props {
  skill: {
    name: string;
    logo: StaticImageData;
    describe: string;
  };
}

function FlipCard(props: props) {
  const { skill } = props;
  const { name, logo, describe } = skill;
  return (
    <div className={styles["flipCard"]}>
      <div className={styles["flipCard__content"]}>
        <div className={styles["flipCard__front"]}>
          <Image src={logo} width={200} height={175} alt="logo" />
          <h3>{name}</h3>
        </div>
        <div className={styles["flipCard__back"]}>
          <h3>{describe}</h3>
        </div>
      </div>
    </div>
  );
}

export default FlipCard;
