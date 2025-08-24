import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

type LinkItem = {
  label: string;
  to: string;
};

type NavBarProps = {
  leftLinks?: LinkItem[];
  rightLinks?: LinkItem[];
};


export default function NavBar({ leftLinks = [], rightLinks = [] }:NavBarProps ) {
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

                <Nav>
                  {rightLinks.map((link)=>{
                      return (<Nav.Link key={link.to} as={NavLink} to={`${link.to}`}>
                        {link.label}
                      </Nav.Link>)
                  })
                  }
                </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

