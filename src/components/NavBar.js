import React from "react";
import { Navbar, Container, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const currentUser = "marz Barz";

  const loggedInUser = (
    <>
      <Nav className="mr-auto">

        <NavLink to="/addProject" className={styles.NavLink}>
          Add Project to Track
        </NavLink>

        <Nav.Item>
          <NavLink to="/home" className={styles.NavLink}>
            Log Out
          </NavLink>
        </Nav.Item>
      </Nav>
    </>
  );

  const loggedOutUser = (
    <>
      <Nav.Link
        to="/signup"
        className={styles.NavLink}
      // activeClassName={styles.Active}
      >
        Sign up
      </Nav.Link>
      <Nav.Link
        className={styles.NavLink}
        // activeClassName={styles.Active}
        to="/signin"
      >
        Sign in
      </Nav.Link>
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
          {currentUser ? <Nav.Link href="#home">User: {currentUser}</Nav.Link> : null}
          <Navbar.Toggle />
          <Navbar.Collapse id="basic-navbar-nav">
            {currentUser ? loggedInUser : loggedOutUser}
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
