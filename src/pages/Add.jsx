import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function CreateSurveys(props) {
  const [validated, setValidated] = useState(false);
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    // creator: '',
    // password: '',
    // user_pass: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      question: formData.name,
      surveyid: params.id,
    };
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      const response = await fetch("https://surveysiteapi.onrender.com/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Question Created");
        setFormData({
          name: "",
          type: "",
          // creator: '',
          // password: '',
          // user_pass: '',
        });
        setValidated(false);
        navigate("/edit/" + params.id + "/" + params.name); // navigate to edit page
      } else {
        alert("Failed to submit question...");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <Container className="background">
      <div className="wrapper">
      <h1>Add Question</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Question</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Question"
            size="lg"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        {/*<Form.Group controlId="validationCustom02">
          <Form.Label>Type</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Survey Type"
            size="sm"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group controlId="validationCustom03">
          <Form.Label>Creator</Form.Label>
          <Form.Control
            type="text"
            placeholder="Survey creator"
            required
            size="sm"
            name="creator"
            value={formData.creator}
            onChange={handleChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group> */}
        {/* <Form.Group controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            size="sm"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password
          </Form.Control.Feedback>
        </Form.Group> */}
        {/* <Form.Group controlId="validationCustom05">
          <Form.Label>User Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="User_Pass"
            required
            size="sm"
            name="user_pass"
            value={formData.user_pass}
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group> */}
        <div style={{ display: "flex", justifyContent: "end" }}>
          <Button
            variant="outline-dark"
            size="lg"
            type="submit"
            className="mt-5"
          >
            Submit form
          </Button>
        </div>
      </Form>
      </div>
    </Container>
  );
}

export default CreateSurveys;
