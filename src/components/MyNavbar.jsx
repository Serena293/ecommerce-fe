import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useCart from "../useCart";

const MyNavbar = ({ isAuthenticated, userRole, onLogout }) => {
  const { cartCount } = useCart();

  return (
    <Navbar expand="lg" variant="light">
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
              <Nav.Link as={Link} to="/home">
                Home
              </Nav.Link>

              {!isAuthenticated && (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}

              {!isAuthenticated && (
                <Nav.Link as={Link} to="/register">
                  Sign up
                </Nav.Link>
              )}

              <Nav.Link as={Link} to="/cart" className="position-relative">
                <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
                {cartCount > 0 && (
                  <span className="position-absolute badge rounded-pill bg-danger cart-badge">
                    {cartCount}
                    <span className="visually-hidden">cart items</span>
                  </span>
                )}
              </Nav.Link>

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
                    <Nav.Link onClick={onLogout} className="mx-3">
                      Logout
                    </Nav.Link>
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
