import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ currentUser, logUserOut }) => {
  // const currentUser = {
  //   username: "test",
  //   password: "test",
  // };
  const [newUser, setNewUser] = useState(currentUser);
  useEffect(() => {
    setNewUser({ username: currentUser.username });
  }, [currentUser]); //add currentuser after testing

  const handleLogout = () => {
    alert("are you sure you want to log out?");
    setNewUser({});
    logUserOut();
  };

  const loggedInUser = (
    <>
      <Nav.Item className={styles.navBarLinks}>
        <NavLink to="/addProject">Add Project to Track</NavLink>
      </Nav.Item>

      <Nav.Item>
        <NavLink to="" className={styles.navBarLinks} onClick={handleLogout}>
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

  // const addProject = (
  //   <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
  //     <i className="fa-solid fa-folder-plus"></i>Add a Project to Track
  //   </NavLink>
  // );

  return (
    <div>
      <Navbar bg="light" expand="xl" fixed="top">
        <Container>
          <Navbar.Brand>
            <NavLink to="/">
              Bug Alert<i className="fa-solid fa-crosshairs"></i>
            </NavLink>
          </Navbar.Brand>
          {newUser.username ? <Nav.Link to="/">User: {newUser.username}</Nav.Link> : null}
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            {newUser.username ? loggedInUser : loggedOutUser}
            <div className="ml-auto">
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
