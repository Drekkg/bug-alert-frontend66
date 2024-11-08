import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import styles from "../styles/SignInForm.module.css";
import axios from "axios";

function SignInForm({ addUser }) {
  const history = useHistory();
  const closeForm = () => {
    history.push("/");
  };

  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const { username, password } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("user", user);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/dj-rest-auth/login/", user);
      // setTokenTimestamp(data);
      alert("You have successfully logged in.");
      addUser(user); // Add user to the state
      history.push("/");
    } catch (err) {
      console.log("err", err.response?.data);
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <Container className={styles.SignInForm}>
        <h2>Sign In</h2>
        {errors.username?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter you username"
              name="username"
              value={username}
              autoComplete="username"
            />
            <Form.Text className="text-muted">Please enter Your username.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Password"
              name="password"
              value={password}
              autoComplete="current-password"
            />
          </Form.Group>
          <Form.Text className="text-muted">Please enter Your password.</Form.Text>
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
          <Link to="/signupform">
            Don't have an account? <span>Sign Up</span>
          </Link>
        </Container>
      </Container>
    </div>
  );
}

export default SignInForm;
