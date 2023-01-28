import Image from "next/image";
import styles from "./Footer.module.css";

import github from "/public/images/github.png";
import linkedin from "/public/images/linkedin.png";

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div>
        <div>
          © 2022 Made by Joni with❤️powered by{" "}
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel
          </a>{" "}
        </div>
      </div>
      <div className={styles.containerImgs}>
        <a
          href="https://www.linkedin.com/in/joniaguero/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={github} width={30} />
        </a>
        <a
          href="https://github.com/JoniAguero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src={linkedin} width={30} />
        </a>
      </div>
    </div>
  );
};
