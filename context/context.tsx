import { createContext } from "react";
import { useEffect, useState } from "react";
interface props {
  children: JSX.Element;
}

const context = createContext({});

export function ContextProvider(props: props) {
  const [fixNavbar, setFixNavbar] = useState(false);
  const [phoneUser, setPhoneUser] = useState(false);
  useEffect(() => {
    window.scrollY > 200 ? setFixNavbar(true) : setFixNavbar(false);
    window.innerWidth < 600 ? setPhoneUser(true) : setPhoneUser(false);
    window.addEventListener("resize", () => {
      window.innerWidth < 600 ? setPhoneUser(true) : setPhoneUser(false);
    });
    window.addEventListener("scroll", () => {
      window.scrollY > 200 ? setFixNavbar(true) : setFixNavbar(false);
    });
    return () => {
      window.removeEventListener("scroll", () => {
        window.scrollY > 200 ? setFixNavbar(true) : setFixNavbar(false);
      });
      window.removeEventListener("resize", () => {
        window.innerWidth < 600 ? setPhoneUser(true) : setPhoneUser(false);
      });
    };
  }, []);
  return (
    <context.Provider value={{ fixNavbar, phoneUser }}>
      {props.children}
    </context.Provider>
  );
}

export default context;
