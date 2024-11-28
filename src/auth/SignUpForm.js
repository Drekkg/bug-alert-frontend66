import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory, Link } from "react-router-dom";
import styles from "../styles/SignUpForm.module.css";
import axios from "axios";

function SignUpForm() {
  const history = useHistory();
  const closeForm = () => {
    history.push("/");
  };
  const [alertShow, setAlertShow] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = newUser;
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", newUser);
      setAlertShow(true);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };
  const alert = (
    <div className={styles.Backdrop}>
      <Alert variant="info" className={styles.AlertModal}>
        <Alert.Heading>You have successfully Signed Up</Alert.Heading>
        <p>
          Thank you for choosing <i className="fa-solid fa-crosshairs"></i>Bug Alert - Please sign
          in to continue
        </p>
        <hr />
        <div className="d-flex justify-content-center">
          <Button
            onClick={() => {
              setAlertShow(false);
              history.push("/signinform");
            }}
            variant="info"
            block
          >
            Sign In
          </Button>
        </div>
      </Alert>
    </div>
  );
  return (
    <div>
      <Container className={styles.SignUpForm}>
        <h1>Sign Up</h1>
        <h3>{alertShow && alert}</h3>
        <Form onSubmit={submitHandler} autoComplete="off">
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Text className="text-muted">Please enter a username.</Form.Text>
            {errors.username?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Control
              type="text"
              onChange={handleChange}
              autoComplete="off"
              placeholder="Enter you username"
              name="username"
              value={username}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Text className="text-muted">
              Please create a password (at least 8 Characters: Numbers and Letters ).
            </Form.Text>
            {errors.password1?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Password"
              name="password1"
              value={password1}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword1">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Text className="text-muted">Please confirm your password.</Form.Text>
            {errors.password2?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Confirm Password"
              name="password2"
              value={password2}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button variant="warning" className={styles.CloseButton} onClick={closeForm}>
            Close
          </Button>
          {errors.non_field_errors?.map((message, idx) => (
            <Alert key={idx} variant="warning" className="mt-3">
              {message}
            </Alert>
          ))}
        </Form>
        <Container>
          <Link to="/signinform">
            Already have an account? <span>Sign in</span>
          </Link>
        </Container>
      </Container>
    </div>
  );
}

export default SignUpForm;
