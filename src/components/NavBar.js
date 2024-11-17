import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ currentUser, logUserOut }) => {
  const [newUser, setNewUser] = useState(currentUser);
  useEffect(() => {
    setNewUser({ username: currentUser.username });
  }, [currentUser]); //eslint-disable-line

  const handleLogout = () => {
    alert("are you sure you want to log out?");
    setNewUser({});
    logUserOut();
    window.location.reload(true);
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

  return (
    <div>
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
    </div>
  );
};

export default NavBar;
