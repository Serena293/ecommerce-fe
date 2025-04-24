import { Navbar, Container, Nav, Offcanvas, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

const MyNavbar = ({ handleLogout }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return (
    <Navbar expand="lg" variant="light" fixed="top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">Brand link</Navbar.Brand>

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
              {!isAuthenticated && <Nav.Link as={Link} to="/login">Login</Nav.Link>}    
              <Nav.Link as={Link} to="/home">Home</Nav.Link>
                <Nav.Link as={Link} to="/cart">My Cart</Nav.Link>
              <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Altro</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                {isAuthenticated && (
                  <>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Log Out
                    </NavDropdown.Item>
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