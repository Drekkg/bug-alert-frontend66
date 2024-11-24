import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

import { useLoggedinUser, useSetLoggedinUser } from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = ({ currentUser }) => {
  const loggedUser = useLoggedinUser();
  const setLoggedUser = useSetLoggedinUser();

  console.log(loggedUser?.username);

  // const [newUser, setNewUser] = useState(currentUser);
  const [logoutAlert, setLogoutAlert] = useState(false);

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // useEffect(() => {
  //   setNewUser({ username: currentUser.username });
  // }, [currentUser]); //eslint-disable-line
  const history = useHistory();

  const handleLogout = () => {
    setLogoutAlert(!logoutAlert);
  };
  const logUserOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setLoggedUser(null);
      setLogoutAlert(!logoutAlert);
    } catch (err) {}
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
    <Modal show={logoutAlert} onHide={() => setLogoutAlert(false)} backdrop="static">
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
            history.goBack();
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
            logUserOut();
            window.location.reload(true);
          }}
          variant="warning"
          block
        >
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <div className={styles.Alertmodal}>
      <Navbar expanded={expanded} bg="light" expand="xl" fixed="top">
        <Container>
          <Navbar.Brand>
            <NavLink to="/" className={styles.navHeading}>
              Bug Alert<i className="fa-solid fa-crosshairs"></i>
            </NavLink>
          </Navbar.Brand>
          {loggedUser?.username ? (
            <div className={styles.user} to="/">
              User: <span className={styles.userName}>{loggedUser?.username}</span>
            </div>
          ) : null}

          <Navbar.Toggle ref={ref} onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            {loggedUser?.username ? loggedInUser : loggedOutUser}
            <div className="ml-auto"></div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {logoutAlert && alertToLogout}
    </div>
  );
};

export default NavBar;
