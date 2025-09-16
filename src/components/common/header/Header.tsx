
import { Badge} from "react-bootstrap";
import styles from "./styles.module.css";
import NavBar from "../Navbar/NavBar";

import HeaderRightBat from "./HeaderRightBar/HeaderRightBat";
const { headerContainer, headerLogo,icons_shape } = styles;

const Header = () => {
    const leftLinks = [
    { label: "Home", to: "/" },
    { label: "Categories", to: "/categories" },
    { label: "About", to: "/about-us" },
    {label :"user", to :"/dashboard"}
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
        <div className={icons_shape}> 
          
            <HeaderRightBat />
        </div>

      </div>
        <NavBar leftLinks={leftLinks} rightLinks={rightLinks} />
    </header>
  );
};

export default Header;