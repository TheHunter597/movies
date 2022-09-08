import Link from "next/link";
import { useContext, useState } from "react";
import context from "../../context/context";
import styles from "./Navbar.module.scss";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
function Navbar() {
  const contextData = useContext(context) as {
    fixNavbar: boolean;
    phoneUser: boolean;
  };
  const { fixNavbar, phoneUser } = contextData;
  const [openNav, setOpenNav] = useState(false);

  const sections = ["Skills", "Projects", "Contact"];
  const links = sections.map((link) => {
    return (
      <li key={link} onClick={() => setOpenNav((prev) => !prev)}>
        <Link href={`/#${link}`}>{link}</Link>
      </li>
    );
  });
  return (
    <nav
      className={`${styles["Navbar"]} ${
        fixNavbar ? styles["Navbar--fixed"] : ""
      }`}
    >
      {!phoneUser ? (
        <ul>
          <li
            onClick={() => {
              setOpenNav((prev) => !prev);
            }}
          >
            <Link href="/">Home</Link>
          </li>
          {links}
        </ul>
      ) : (
        <div className={styles["Navbar__phone"]}>
          <div
            onClick={() => {
              setOpenNav((prev) => !prev);
            }}
          >
            {!openNav ? <FaBars /> : <AiOutlineClose />}
          </div>
          {openNav ? (
            <ul>
              <li
                onClick={() => {
                  setOpenNav((prev) => !prev);
                }}
              >
                <Link href="/">Home</Link>
              </li>
              {links}
            </ul>
          ) : (
            ""
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
