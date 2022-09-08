import { useState, useRef, useContext } from "react";
import context from "../../../context/context";
import styles from "./Skills.module.scss";
import { skills } from "../../../data/skillsData";
import FlipCard from "../FlipCard/FlipCard";
function Skills() {
  const [showArrow, setShowArrow] = useState(false);
  const skillContainer = useRef<HTMLDivElement>(null);
  //   {
  //     name: "HTML",
  //     logo: HTMLLogo,
  //     describe:
  //       "Using HTML to construct a semetic website thats properly structured ",
  //   },
  //   {
  //     name: "CSS",
  //     logo: CssLogo,
  //     describe:
  //       "love to create and play with animation and layouts to create beatiful looking websites",
  //   },
  //   {
  //     name: "SCSS",
  //     logo: SassLogo,
  //     describe:
  //       "cross browser compatibility for css code with cleaner folder system ",
  //   },
  //   {
  //     name: "Javascript",
  //     logo: JSlogo,
  //     describe: "Write well formulated thats easy to maintain and modify ",
  //   },
  //   {
  //     name: "React",
  //     logo: ReactLogo,
  //     describe:
  //       "Built tens of projects varying from small to large and what I say is what a great library",
  //   },
  //   {
  //     name: "Typescript",
  //     logo: Typescript,
  //     describe:
  //       "Uses it to avoid any error related to type of data passed and make the code more maintainable",
  //   },
  //   {
  //     name: "Next Js",
  //     logo: Next,
  //     describe:
  //       "using next js to construct dynamic and static sites that are highly responsive and fast",
  //   },
  //   {
  //     name: "Redux",
  //     logo: Redux,
  //     describe:
  //       "At first I was using context api with useReducer for complex state managment but due to my apps getting more complex I am shiffting to using redux",
  //   },
  // ];
  const contextData = useContext(context) as {
    phoneUser: boolean;
  };
  const { phoneUser } = contextData;
  function moveLeft() {
    skillContainer.current!.scrollLeft -= window.innerWidth;
  }
  function moveRight() {
    skillContainer.current!.scrollLeft += window.innerWidth;
  }

  const flipCards = skills.map((entry) => {
    return <FlipCard skill={entry} key={entry.name} />;
  });

  return (
    <div className={styles["Skills"]} id="Skills">
      <div
        className={styles["Skills__content"]}
        onMouseEnter={() => setShowArrow(true)}
        onMouseLeave={() => setShowArrow(false)}
      >
        <h2 className={styles["Skills__title"]}>
          {" "}
          Skills<span>Use the arrows to navigate between them</span>
        </h2>
        <div className={styles["Skills__skills"]} ref={skillContainer}>
          {flipCards}
        </div>
        {showArrow && !phoneUser ? (
          <div className={styles["Skills__move"]}>
            <button
              className={styles["Skills__move--right"]}
              onClick={moveRight}
            >
              &rarr;
            </button>
            <button className={styles["Skills__move--left"]} onClick={moveLeft}>
              &larr;
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Skills;
