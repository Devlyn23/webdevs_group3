import React, { useState } from "react";
import { Button, Form, Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch("https://surveysiteapi.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (response.status === 200) {
        window.globalVariable = true;
        window.globalVariable2 = false;
        navigate("/mysurveys");
      } else {
        const resData = await response.json();
        if (response.status === 404) {
          setError(resData.message || "User not found");
          setShowRegisterPrompt(true);
        } else {
          setError(resData.message || "Invalid username or password");
          setShowRegisterPrompt(false);
        }
      }
    } catch (err) {
      setError("Error connecting to the server. Please try again.");
      setShowRegisterPrompt(false);
    }
  };

  return (
    <Container className="background">
      <div className="wrapper">
      <div className="login-container">
        <h1>Log In</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {showRegisterPrompt && (
          <Alert variant="info">
            User not found. Would you like to{" "}
            <a
              onClick={() => navigate("/registration")}
              style={{ cursor: "pointer" }}
            >
              register
            </a>{" "}
            instead?
          </Alert>
        )}
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter your username"
              size="lg"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Enter your password"
              size="lg"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              type="submit"
              className="mt-3"
            >
              Log In
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              className="mt-3"
              onClick={() => navigate("/registration")}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>
      </div>
    </Container>
  );
}

export default Login;
