import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { NavLink, useHistory } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ currentUser, logUserOut }) => {
  const [newUser, setNewUser] = useState(currentUser);
  const [logoutAlert, setLogoutAlert] = useState(false);

  useEffect(() => {
    setNewUser({ username: currentUser.username });
  }, [currentUser]); //eslint-disable-line
  const history = useHistory();
  const handleLogout = () => {
    setLogoutAlert(!logoutAlert);
  };

  const loggedInUser = (
    <>
      <Nav.Item>
        <NavLink className={styles.navBarProject} to="/addProject">
          Add Project to Track
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink to="/" className={styles.navBarLinks} onClick={handleLogout}>
          Log Out
        </NavLink>
      </Nav.Item>
    </>
  );

  const loggedOutUser = (
    <>
      <Nav.Item>
        <NavLink to="/signupform" className={styles.navBarLinks}>
          Sign up
        </NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink className={styles.navBarLinks} to="/signinform">
          Sign in
        </NavLink>
      </Nav.Item>
    </>
  );

  
  const alertToLogout = (
    <Modal show={" "} onHide={" "} backdrop="static">
      <Modal.Header>
        <Modal.Title></Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you Sure you Want to Logout?</Modal.Body>
      <Modal.Footer>
        <Button
          size="sm"
          className={styles.goBackButton}
          onClick={() => {
            setLogoutAlert(false);
            history.push("/");
          }}
          variant="info"
          block
        >
          Go Back
        </Button>
        <Button
          size="sm"
          className={styles.logoutButton}
          onClick={() => {
            setNewUser({});
            logUserOut();
            window.location.reload(true);
          }}
          variant="warning"
          block
        >
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>);

  return (
    <div className={styles.Alertmodal}>
      <Navbar bg="light" expand="xl" fixed="top">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className={styles.navHeading}>
              Bug Alert<i className="fa-solid fa-crosshairs"></i>
            </NavLink>
          </Navbar.Brand>

          {newUser.username ? (
            <div className={styles.user} to="/">
              User: <span className={styles.userName}>{newUser.username}</span>
            </div>
          ) : null}
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            {newUser.username ? loggedInUser : loggedOutUser}
            <div className="ml-auto"></div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {logoutAlert && alertToLogout}
    </div>
  );
};

export default NavBar;
