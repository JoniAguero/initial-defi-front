import { Container } from "@chakra-ui/react";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import styles from "./Layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <Container maxW="container.xl">{children}</Container>
      </div>
      <Footer />
    </div>
  );
};
