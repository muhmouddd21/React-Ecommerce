import { HeaderBasket } from "../../eCommerce";
import { Badge} from "react-bootstrap";

import styles from "./styles.module.css";
import NavBar from "../Navbar/NavBar";
const { headerContainer, headerLogo } = styles;

const Header = () => {
    const leftLinks = [
    { label: "Home", to: "/" },
    { label: "Categories", to: "/categories" },
    { label: "About", to: "/about-us" },
  ];

  const rightLinks = [
    { label: "Login", to: "/login" },
    { label: "Register", to: "/register" },
  ];

  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>our</span> <Badge bg="info">Ecom</Badge>
        </h1>

        <HeaderBasket />
      </div>
        <NavBar leftLinks={leftLinks} rightLinks={rightLinks} />
    </header>
  );
};

export default Header;