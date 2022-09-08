import styles from "./Contact.module.scss";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import * as EmailValidator from "email-validator";
import ClipLoader from "react-spinners/ClipLoader";
const contactsData = [
  {
    name: "Githup",
    icon: <AiFillGithub />,
    url: "https://github.com/TheHunter597",
  },
  {
    name: "LinkedIn",
    icon: <AiFillLinkedin />,
    url: "",
  },
  {
    name: "WhatsApp",
    icon: <AiOutlineWhatsApp />,
    url: "https://wa.me/01229308595?text=urlencodedtext",
  },
  {
    name: "Gmail",
    icon: <SiGmail />,
    url: "https://mail.google.com/mail/u/0/?hl=en&tf=cm&fs=1&to=thehunter597777@gmail.com",
  },
];

function About() {
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [sentSucessfully, setSentSucessfully] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const sections = ["Skills", "Projects", "Contact"];
  const router = useRouter();
  const links = sections.map((link) => {
    return (
      <li key={link.toLocaleLowerCase()}>
        <Link href={`/#${link}`}>{link}</Link>
      </li>
    );
  });
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const commentInput = useRef<HTMLTextAreaElement>(null);

  function validate(data: { name: string; email: string; comment: string }) {
    const { name, email, comment } = data;
    if (name.length < 6 || name.length > 30) {
      setNameError(true);
      nameInput.current?.focus();
      setErrorMessage("Name should be between 6 and 30 caracters");
      return false;
    } else if (
      email.length < 12 ||
      email.length > 50 ||
      !EmailValidator.validate(email)
    ) {
      setNameError(false);
      setEmailError(true);
      emailInput.current?.focus();
      setErrorMessage(
        "email should be between 12 and 50 caracters and typed correctly"
      );

      return false;
    } else if (comment.length < 6 || comment.length > 200) {
      setNameError(false);
      setEmailError(false);
      setCommentError(true);
      commentInput.current?.focus();
      setErrorMessage("comment should be at least of 6 caracters");
      return false;
    } else {
      setNameError(false);
      setEmailError(false);
      setCommentError(false);
      setSentSucessfully(true);
      setTimeout(() => {
        setSentSucessfully(false);
      }, 4000);
      setErrorMessage("Message Sent sucessfully");

      return true;
    }
  }
  async function sendEmail() {
    const data = {
      name: nameInput.current ? nameInput.current.value : "",
      email: emailInput.current ? emailInput.current.value : "",
      comment: commentInput.current ? commentInput.current.value : "",
    };

    if (validate(data)) {
      fetch("/api/postComment", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      });
    }
  }

  const contacts = contactsData.map((contact) => {
    return (
      <div key={contact.name}>
        <button>
          {" "}
          <Link href={contact.url}>
            <a target="_blank" rel="noreferrer ">
              {contact.icon}
            </a>
          </Link>
        </button>
        <h4>{contact.name}</h4>
      </div>
    );
  });
  return (
    <div className={styles["contact"]} id="Contact">
      <div className={styles["contact__content"]}>
        <nav className={styles["contact__nav"]}>
          <ul>
            <li onClick={() => router.push("/")}>Home</li>
            {links}
          </ul>
        </nav>
        <div className={styles["contact__social"]}>{contacts}</div>
        <form
          className={styles["contact__form"]}
          onSubmit={(e) => {
            e.preventDefault();
            sendEmail();
          }}
        >
          {!sentSucessfully ? (
            <>
              <input
                placeholder="Your name"
                ref={nameInput}
                className={nameError ? styles["error"] : ""}
              />
              <input
                placeholder="Email"
                type="email"
                ref={emailInput}
                className={emailError ? styles["error"] : ""}
              />
              <textarea
                placeholder="Comment"
                ref={commentInput}
                className={commentError ? styles["error"] : ""}
              />
              <small
                className={
                  emailError || commentError || nameError
                    ? styles[`contact__message--error`]
                    : styles[`contact__message--sucess`]
                }
              >
                {errorMessage.length > 5 ? errorMessage : ""}
              </small>
              <button type="submit">Confirm</button>
            </>
          ) : (
            <ClipLoader size={250} color={"white"} />
          )}
        </form>
      </div>
    </div>
  );
}

export default About;
