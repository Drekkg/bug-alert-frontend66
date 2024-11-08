import React, { useState, useEffect } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styles from "../styles/SignUpForm.module.css";
import axios from "axios";

function SignUpForm() {
  const history = useHistory();
  const closeForm = () => {
    history.push("/");
  };

  const [newUser, setNewUser] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = newUser;
  const [errors, setErrors] = useState({});
  let isMounted = true;

  // useEffect(() => {
  //   return () => {
  //     isMounted = false; // Cleanup function to set isMounted to false when the component unmounts
  //   };
  // }, []);

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
      alert("Sign up successful!");
      history.push("/signinform");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <Container className={styles.SignUpForm}>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
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
              placeholder="Enter you username"
              name="username"
              value={username}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Text className="text-muted">Please create a password.</Form.Text>
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
