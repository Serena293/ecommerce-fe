import {
  Navbar,
  Container,
  Nav,
  Offcanvas,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import useCart from "../useCart";
import logo from "../../public/logo.png"

const MyNavbar = ({ isAuthenticated, userRole, onLogout }) => {
  const { cartCount } = useCart();

  // console.log(userRole)

  return (
    <Navbar expand="lg" bg="light" variant="light" className="shadow-sm">
      <Container fluid>
        
       <Navbar.Brand as={Link} to="/home" className={`fw-bold navbarBrand`}>
  <img 
    src={logo} 
    alt="Jucy Art Logo" 
    className="navbarLogo"
  />
  <span className="navbarText">It's juicy art</span>
</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="bg-light"
        >
          <Offcanvas.Header closeButton className="border-bottom">
            <Offcanvas.Title id="offcanvasNavbarLabel" className="fw-bold">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="ms-auto align-items-lg-center">
              <Nav.Link as={Link} to="/home" className="px-3 py-2 py-lg-1">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/shop" className="px-3 py-2 py-lg-1">
                Shop
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/cart"
                className="px-3 py-2 py-lg-1 position-relative"
              >
                <div className="d-flex align-items-center">
                  <div className="position-relative">
                    <i className="bi bi-cart fs-5 me-1"></i>
                    {cartCount > 0 && (
                      <Badge 
                        pill 
                        bg="danger" 
                        className="position-absolute top-0 start-100 translate-middle"
                        style={{ 
                          fontSize: '0.6rem',
                          transform: 'translate(-20%, -20%)' 
                        }}
                      >
                        {cartCount}
                      </Badge>
                    )}
                  </div>
                  <span>My Cart</span>
                </div>
              </Nav.Link>

              {!isAuthenticated && (
                <>
                  <Nav.Link 
                    as={Link} 
                    to="/login" 
                    className="px-3 py-2 py-lg-1"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link 
                    as={Link} 
                    to="/register" 
                    className="px-3 py-2 py-lg-1 bg-dark text-white rounded-pill ms-lg-2"
                  >
                    Sign Up
                  </Nav.Link>
                </>
              )}

              {isAuthenticated && (
                <NavDropdown 
                  title={
                    <span className="px-3 py-2 py-lg-1 text-dark">
                      Account
                    </span>
                  } 
                  id="collapsible-nav-dropdown"
                  className="px-3"
                  align="end"
                >
                  <NavDropdown.Item as={Link} to="/profile" className="py-2">
                    <i className="bi bi-person me-2"></i>Profile
                  </NavDropdown.Item>

                  {userRole === "ADMIN" && (
                    <NavDropdown.Item as={Link} to="/admin" className="py-2">
                      <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
                    </NavDropdown.Item>
                  )}

                  <NavDropdown.Item href="#action/3.3" className="py-2">
                    <i className="bi bi-gear me-2"></i>Settings
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={onLogout} className="py-2 text-danger">
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;