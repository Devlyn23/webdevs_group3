import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

function EditSurvey() {
  const [questions, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    surveyid: params.id,
    // creator: '',
    // password: '',
    // user_pass: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://surveysiteapi.onrender.com/questions/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // include cookies
          body: JSON.stringify(formData),
        });

        if (response.status === 401) {
          navigate("/login"); // redirect to login page if unauthorized
        } else if (!response.ok) {
          throw new Error("Failed to load questions");
        } else {
          const data = await response.json();
          setSurveys(data);
        }
      } catch (err) {
        setError(err.message || "An unknown error occurred");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async() => {
    alert("Survey Submitted");
    try {
      navigate("/mysurveys")
    } catch (err) {
      console.log("Error during Delete: ", err.message);
      alert("An error occurred while deleting");
    }
  };

  if (error) {
    return (
      <Container>
        <div>Error: {error}</div>
      </Container>
    );
  }

  return (
    <Container className="background">
      <div className="wrapperX">
      <Row>
        <Col>
          <h1>Survey: {params.name}</h1>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb-3"
              style={{ marginRight: "25px" }}
              onClick={() => navigate("/mysurveys")}
            >
              Back to Surveys
            </Button>
          </div>

          {questions.length > 0 ? (
            <ul>
              {questions.map((item) => (
                <li key={item._id} className="surveyList">
                  <div className="runDesc">
                    <p>Question: {item?.question}</p>
                    <input name="myInput" className="inputField" />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available...</p> // message when no questions exist
          )}
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button variant="outline-dark" size="lg" className="mb=3" onClick = {() => handleSubmit()}>
              Submit
            </Button>
          </div>
        </Col>
      </Row>
      </div>
    </Container>
  );
}

export default EditSurvey;
