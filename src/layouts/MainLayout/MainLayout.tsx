import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";
import {Header,Footer} from "@components/common/index";
import { Container } from "react-bootstrap";

const { layoutContainer, wrapper } = styles;

export default function MainLayout() {
  return (
    <Container className={layoutContainer}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
    </Container>
  )
}
