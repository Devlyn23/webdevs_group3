import React, { useEffect, useState } from "react";
import Logo from "../assets/images/TeamLogo_Transparent.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar, Button } from "react-bootstrap";

function Header() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  // paths for hide links
  const isCreatePage = path === "/create";
  const isEditPage = path.startsWith("/edit");
  const isUpdatePage = path.startsWith("/update");
  const isRunPage = path.startsWith("/run");
  const isAddPage = path.startsWith("/add");

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // check isAuthenticated or not
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch("https://surveysiteapi.onrender.com/auth/status", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.log("Error checking auth status: ", err.message);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
  }, [location]);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://surveysiteapi.onrender.com/auth/logout", {
        method: "POST",
        credentials: "include", // include cookies
      });

      if (response.ok) {
        alert("You have been logged out");
        // window.globalVariable = false;
        // window.globalVariable2 = true;
        setIsAuthenticated(false);
        navigate("/"); // redirect to home page
      } else {
        throw new Error("Logout failed");
      }
    } catch (err) {
      console.log("Error during logout: ", err.message);
      alert("An error occurred while logging out", err.message);
    }
  };

  return (
    <>
    <div className="title">
    <h1>SimpleSurvey.com</h1>
    </div>
        <Navbar expand="lg" sticky="top" className="navbar">
      <Container className="d-flex align-items-center">
        <Navbar.Brand>
          <Link to="/">
            <img src={Logo} alt="Webdevs.com Logo image" className="logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content">
          <Nav className="me-auto">
            <Nav.Item className="mx-2">
              <Link to="/" className={path === "/" ? "active" : ""}>
                Home
              </Link>
            </Nav.Item>
            {/* (window.globalVariable2 || isLoginPage || isRegistrationPage) */}
            {!isAuthenticated && (
              <>
                <Nav.Item className="mx-2">
                  <Link
                    to="/login"
                    className={path === "/login" ? "active" : ""}
                  >
                    Login
                  </Link>
                </Nav.Item>
                <Nav.Item className="mx-2">
                  <Link
                    to="/registration"
                    className={path === "/registration" ? "active" : ""}
                  >
                    Registration
                  </Link>
                </Nav.Item>
              </>
            )}
            {/* window.globalVariable */}
            {isAuthenticated && (
              <>
                <Nav.Item className="mx-2">
                  <Link
                    to="/mysurveys"
                    className={path === "/mysurveys" ? "active" : ""}
                  >
                    My Surveys
                  </Link>
                </Nav.Item>
              </>
            )}

            {isEditPage && (
              <Nav.Item className="mx-2">
                <Link to="/edit" className={isEditPage ? "active" : ""}>
                  Edit
                </Link>
              </Nav.Item>
            )}
            {isUpdatePage && (
              <Nav.Item className="mx-2">
                <Link to="/update" className={isUpdatePage ? "active" : ""}>
                  Update
                </Link>
              </Nav.Item>
            )}
            {isRunPage && (
              <Nav.Item className="mx-2">
                <Link to="/run" className={isRunPage ? "active" : ""}>
                  Run
                </Link>
              </Nav.Item>
            )}
            {isAddPage && (
              <Nav.Item className="mx-2">
                <Link to="/add" className={isAddPage ? "active" : ""}>
                  Add
                </Link>
              </Nav.Item>
            )}
            {isCreatePage && (
              <>
                <Nav.Item className="mx-2">
                  <Link
                    to="/create"
                    className={path === "/create" ? "active" : ""}
                  >
                    Create Surveys
                  </Link>
                </Nav.Item>
              </>
            )}
            {/* window.globalVariable  */}
            {isAuthenticated && (
              <Nav.Item className="logout">
                <Button variant="outline-dark" size="md" onClick={handleLogout}>
                  Logout
                </Button>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    </>
  );
}

export default Header;
