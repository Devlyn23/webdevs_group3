import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function MySurveys() {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://surveysiteapi.onrender.com/surveys", {
          method: "GET",
          credentials: "include", // include cookies
        });

        if (response.status === 401) {
          navigate("/login"); // redirect to login page if unauthorized
          console.log(response.status)
        } else if (!response.ok) {
          throw new Error("Failed to load surveys");
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

  const handleDeleteS = async (id) => {
    try {
      const response = await fetch("https://surveysiteapi.onrender.com/surveys/" + id, {
        method: "DELETE",
        credentials: "include", // include cookies
      });

      if (response.ok) {
        alert("Survey Deleted");
        await questionsDelete(id);
        setSurveys((prevState) => prevState.filter((item) => item._id !== id));
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.log("Error during Delete: ", err.message);
      alert("An error occurred while deleting");
    }
  };

  const questionsDelete = async (id) => {
    const data = { surveyid: id };
    try {
      const response = await fetch("https://surveysiteapi.onrender.com/questions", {
        method: "DELETE",
        credentials: "include", // include cookies
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Questions Deleted");
      } else {
        throw new Error("Delete failed");
      }
    } catch (err) {
      console.log("Error during Delete: ", err.message);
      alert("An error occurred while deleting");
    }
    // window.location.reload(false);
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
          <h1>My Surveys</h1>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="outline-dark"
              size="lg"
              className="mb=3"
              onClick={() => navigate("/create")}
            >
              Create Survey
            </Button>
          </div>

          {surveys.length > 0 ? (
            <ul>
              {surveys.map((item) => (
                <li key={item._id} className="surveyList">
                  <div className="surveyDesc">
                    <p>Name: {item?.name}</p>
                    <p>Type: {item?.type}</p>
                    <p>Creator: {item?.creator?.username}</p>
                  </div>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() =>
                      navigate("/edit/" + item._id + "/" + item.name)
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() =>
                      navigate("/run/" + item._id + "/" + item.name)
                    }
                  >
                    Run
                  </Button>
                  <Button
                    variant="outline-dark"
                    size="sm"
                    onClick={() => handleDeleteS(item._id)}
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No Surveys available...</p> // message when no surveys exist
          )}
        </Col>
      </Row>
      </div>
    </Container>
  );
}

export default MySurveys;
