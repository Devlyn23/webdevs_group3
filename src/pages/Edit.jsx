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

  const handleDelete = async (id) => {
    try {
      const response = await fetch("https://surveysiteapi.onrender.com/questions/" + id, {
        method: "DELETE",
        credentials: "include", // include cookies
      });

      if (response.ok) {
        alert("Question Deleted");
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.log("Error during Delete: ", err.message);
      alert("An error occurred while deleting");
    }
    window.location.reload(false);
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
          <h1>Questions</h1>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb-3"
              onClick={() => navigate("/mysurveys")}
            >
              Back to Survey
            </Button>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb-3"
              style={{ marginRight: "25px" }}
              onClick={() => navigate("/add/" + params.id + "/" + params.name)}
            >
              Add Question
            </Button>
          </div>
          {questions.length > 0 ? (
            <ul>
              {questions.map((item) => (
                <li key={item._id} className="surveyList">
                  <div className="surveyDesc">
                    <p>Question: {item?.question}</p>
                    <p>Survey Name: {params.name}</p>
                  </div>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() =>
                      navigate(
                        "/update/" +
                          params.id +
                          "/" +
                          params.name +
                          "/" +
                          item._id +
                          "/" +
                          item.question
                      )
                    }
                  >
                    Edit
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No questions available...</p> // message when no questions exist
          )}
        </Col>
      </Row>
      </div>
    </Container>
  );
}

export default EditSurvey;
