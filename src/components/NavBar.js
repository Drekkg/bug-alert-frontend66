import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = ({ currentUser }) => {
  // const currentUser = { username: "Fred andstairsa" }; // must change this back to accept the currentUser prop not currentUser1
  const [newUser, setNewUser] = useState(currentUser);
  useEffect(() => {
    setNewUser(currentUser);
  }, [currentUser]);

  console.log("newUser", newUser);
  const handleLogout = () => {
    alert("are you sure you want to log out?");
    setNewUser({});
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
      <Navbar bg="light" expand="xl">
        <Container>
          <Navbar.Brand href="#home">
            Bug Alert<i className="fa-solid fa-crosshairs"></i>
          </Navbar.Brand>
          {newUser.username ? <Nav.Link href="#home">User: {newUser.username}</Nav.Link> : null}
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
