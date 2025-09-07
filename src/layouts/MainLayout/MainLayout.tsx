import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";
import {Header,Footer} from "@components/common/index";
import { Container } from "react-bootstrap";
import ToastList from "@components/feedback/Toaster/ToastList";

const { layoutContainer, wrapper } = styles;

export default function MainLayout() {
  return (
    <Container className={layoutContainer}>
      <Header />
      <div className={wrapper}>
        <Outlet />
      </div>
      <Footer />
      <ToastList />
    </Container>
  )
}
