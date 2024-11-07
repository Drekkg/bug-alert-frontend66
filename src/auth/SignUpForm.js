import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
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
  console.log(errors.username);
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
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }

    // setNewUser({
    //   username: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <div>
      <Container className={styles.SignUpForm}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
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
            <Form.Text className="text-muted">Please enter a username.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
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

          <Form.Text className="text-muted">Please create a password.</Form.Text>
          <Form.Group controlId="formBasicPassword1">
            <Form.Label>Confirm Password</Form.Label>

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
          <Form.Text className="text-muted">Please confirm your password.</Form.Text>
          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button variant="warning" className={styles.CloseButton} onClick={closeForm}>
            Close
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default SignUpForm;
