import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "../styles/SignUpForm.module.css";

function SignUpForm() {
  const history = useHistory();
  const closeForm = () => {
    history.push("/");
  };
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (newUser.username && newUser.password && newUser.email) {
      setNewUser({
        username: "",
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      alert("Please fill out the required fields.");
    }
  };

  return (
    <div>
      <Container className={styles.SignUpForm}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter you username"
              name="username"
              value={newUser.username}
            />
            <Form.Text className="text-muted">Please enter a username.</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              placeholder="Enter email"
              name="email"
              vlaue={newUser.email}
            />
            <Form.Text className="text-muted">Please enter your email address.</Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Password"
              name="password1"
              value={newUser.password}
            />
          </Form.Group>
          <Form.Text className="text-muted">Please create a password.</Form.Text>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Confirm Password"
              name="password2"
              value={newUser.password}
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
