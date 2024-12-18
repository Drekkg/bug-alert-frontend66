import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import { useHistory, Link } from "react-router-dom";
import styles from "../styles/SignInForm.module.css";
import axios from "axios";
import { useSetLoggedinUser } from "../contexts/CurrentUserContext";

function SignInForm({ addUser }) {
  const history = useHistory();
  const closeForm = () => {
    history.push("/");
  };

  const [errors, setErrors] = useState({});
  const [alertShow, setAlertShow] = useState(false);
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
  const alert = (
    <div className={styles.backdrop}>
      <Alert variant="info" className={styles.alertModal}>
        <Alert.Heading>
          {" "}
          Bug Alert <i className="fa-solid fa-crosshairs"></i>
        </Alert.Heading>
        <p>
          You have successfully Signed in - Welcome to Bug Alert
          <i className="fa-solid fa-crosshairs"></i>
        </p>
        <Button
          onClick={() => {
            setAlertShow(false);
            history.push("/");
          }}
          variant="info"
          block
        >
          Close
        </Button>
      </Alert>
    </div>
  );
  const loggedinUser = useSetLoggedinUser();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", user);
      loggedinUser(data.user);
      addUser(user);
      setAlertShow(true);
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <div>
      <Container className={styles.signInForm}>
        <h2>Sign In</h2>
        <h3>{alertShow && alert}</h3>
        {errors.username?.map((message, idx) => (
          <Alert variant="warning" key={idx}>
            {message}
          </Alert>
        ))}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="userName">
            <Form.Label>Username</Form.Label>
            <Form.Text className="text-muted">Please enter Your username.</Form.Text>
            <Form.Control
              type="text"
              onChange={handleChange}
              placeholder="Enter you username"
              name="username"
              value={username}
              autoComplete="username"
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Text className="text-muted">Please enter Your password.</Form.Text>
            <Form.Control
              type="password"
              onChange={handleChange}
              placeholder="Password"
              name="password"
              value={password}
              autoComplete="current-password"
              required
            />
          </Form.Group>

          <Button variant="success" size="sm" type="submit">
            Sign In
          </Button>
          <Button variant="warning" size="sm" className={styles.closeButton} onClick={closeForm}>
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
