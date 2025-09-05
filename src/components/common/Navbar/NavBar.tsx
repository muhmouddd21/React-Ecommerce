import { logOut } from "@store/Auth/authSlice";
import ThunkAuthLogout from "@store/Auth/Thunk/ThunkAuthLogout";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

type LinkItem = {
  label: string;
  to: string;
};

type NavBarProps = {
  leftLinks?: LinkItem[];
  rightLinks?: LinkItem[];
};


export default function NavBar({ leftLinks = [], rightLinks = [] }:NavBarProps ) {
  const {user,jwt}=useAppSelector(state => state.AuthSlice)
  const dispatchAsync = useAppDispatch()
    const navigate =useNavigate()
    const dispatch=useDispatch()
    const handleLogout = async() => {
    dispatch(logOut());
    await dispatchAsync(ThunkAuthLogout());

    navigate("/");  // redirect to home after logout
  };
  return (
     <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="me-auto">
                {leftLinks.map((link)=>{
                    return (<Nav.Link key={link.to} as={NavLink} to={`${link.to}`}>
                        {link.label}
                    </Nav.Link>)
                })}
            </Nav>

                {!jwt ? (
                   <Nav>
                  {rightLinks.map((link)=>{
                      return (<Nav.Link key={link.to} as={NavLink} to={`${link.to}`}>
                        {link.label}
                      </Nav.Link>)
                  })
                  }
                </Nav>
                ) :
                (
                  <Nav>
                <NavDropdown  title={`Welcome: ${user?.firstName} ${user?.lastName}`}   id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to={'profile'}>profile</NavDropdown.Item>
                    <NavDropdown.Item >orders</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item 
  
                   onClick={handleLogout}
                    >
                      log out
                    </NavDropdown.Item>
                </NavDropdown>
                  </Nav>
                )}



          </Navbar.Collapse>

        </Container>

      </Navbar>
  )
}

