import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "../styles/SignInForm.module.css";

function SignInForm() {
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
    if (newUser.username && newUser.password) {
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
      <Container className={styles.SignInForm}>
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
            <Form.Text className="text-muted">Please enter Your username.</Form.Text>
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
          <Form.Text className="text-muted">Please enter Your password.</Form.Text>
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

export default SignInForm;
