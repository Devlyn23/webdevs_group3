import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CreateS from "../assets/images/creates.jpg";
import CreateQ from "../assets/images/createq.jpg";

function Home(props) {
  const navigate = useNavigate();

  return (
    <Container className="background">
      <div className="wrapperX">
      <h2 className="introtitle">Welcome!</h2>
      <p className="welcomeMsg">
        Welcome to SimpleSurvey.com! A website for building and running simple
        surveys! Register to begin building surveys today!
      </p>
      <hr></hr>
      <div className="flexAlign">
          <img
            src={CreateS}
            alt="Create Survey Image"
            className="imgBorder"
          ></img>
        <div>
          <p className="homeTxt">Define Surveys with Ease:</p>
          <p className="descTxt">
            We aim to make survey creation as easy as possible for users, define the name and type of the survey then submit to create your new survey. Once created, surveys are open for customization through our easy to use editing system.
          </p>
        </div>
      </div>
      <hr></hr>
      <div className="flexAlign">
        <img
            src={CreateQ}
            alt="Create Questions Image"
            className="imgBorder"
          ></img>
        <div>
          <p className="homeTxt">
            Defining Questions made Easy:
          </p>
          <p className="descTxt">
            Our easy to use interface for building questions allows you to make any question for your survey by tayping the question you wish to ask and then submitting to add it to your survey.
          </p>
        </div>
      </div> 
      <hr></hr>     
      <div className="flexAlign">
          <img
            src={CreateQ}
            alt="Create Questions Image"
            className="imgBorder"
          ></img>
        <div>
          <p className="homeTxt">
            Simplified Editing:
          </p>
          <p className="descTxt">
            Editing is made simple by providing you with the original question asked allowing you to compare the original question with the editied question before updating your survey. Removing questions is also easy, with a simple button press delete a question from the list of questions for your your survey.
          </p>
        </div>
      </div>
      <hr></hr>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => navigate("/login")}
        >
          Log In
        </Button>
        <Button
          variant="outline-dark"
          size="lg"
          onClick={() => navigate("/registration")}
        >
          Registration
        </Button>
      </div>
      </div>
    </Container>
  );
}

export default Home;
