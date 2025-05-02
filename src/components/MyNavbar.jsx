import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  NavDropdown,

} from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = ({ isAuthenticated, userRole, onLogout }) => {
  console.log("NAVBAR DEBUG - isAuthenticated:", isAuthenticated);
  console.log("NAVBAR DEBUG - userRole:", userRole);

  console.log(
    "Navbar DEBUG - isAuthenticated:",
    isAuthenticated,
    "role:",
    userRole
  );
  return (
    <Navbar expand="lg" variant="light" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">
          Brand link
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* Login/Logout */}
              {!isAuthenticated && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
   <Nav.Link as={Link} to="/register">
                  Sign up
                </Nav.Link>
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>
              <Nav.Link href="#about">My Cart</Nav.Link>

              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Altro</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>

                {isAuthenticated && userRole === "ADMIN" && (
                  <NavDropdown.Item as={Link} to="/admin">
                    Admin Dashboard
                  </NavDropdown.Item>
                )}

                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                {isAuthenticated && (
                  <>
                     <NavDropdown.Divider />
                    <Nav.Link onClick={onLogout} className="mx-3">Logout</Nav.Link>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
