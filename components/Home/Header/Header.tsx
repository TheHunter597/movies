import styles from "./Header.module.scss";
import { useContext } from "react";
import context from "../../../context/context";
function Header() {
  const contextData = useContext(context) as { fixNavbar: boolean };
  const { fixNavbar } = contextData;

  return (
    <div
      className={styles["Header"]}
      id="Header"
      style={fixNavbar ? { marginTop: "8rem" } : { marginTop: "0rem" }}
    >
      <div className={styles["Header__content"]}>
        <div className={styles["Header__title"]}>
          <h3 className={styles["Header__title--intro"]}>
            <span>Hello</span> there I am
          </h3>
          <h1 className={styles["Header__title--main"]}>Mohamed Hossam</h1>
          <h3 className={styles["Header__title--describe"]}>
            I am a <span>frontend developer</span> hope I can help you{" "}
          </h3>
          <h4 className={styles["Header__title--offer"]}>
            Why dont we work together
          </h4>
        </div>
        <div className={styles["Header__button"]}>
          <button className={styles["animatedButton"]}>Learn More</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
