import React from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
const NavBar = () => {
  const currentUser = "Marz Barz";
  const {expanded, setExpanded, ref} = useClickOutsideToggle();
  const loggedInUser = (

    <>
      <Nav.Link href="#link">User: {currentUser}</Nav.Link>
      <Nav className="mr-auto">
        <NavDropdown title="Take Action" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Add a Project to Track</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">View Your Marked Issues</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#home">Home</Nav.Link>
      </Nav>
    </>
  );
  const loggedOutUser = (
    <>
      <Router>
        {" "}
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
      </Router>
    </>
  );

  const addProject = (
    <Router>
      <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/posts/create">
        <i className="fa-solid fa-folder-plus"></i>Add a Project to Track
      </NavLink>
    </Router>
  );

  return (
    <Navbar bg="light" expand="xl" expanded={expanded}>
      <Container>
        <Navbar.Brand href="#home">
          Bug Alert<i className="fa-solid fa-crosshairs"></i>
        </Navbar.Brand>

        <Navbar.Toggle ref={ref}
          onClick={() => setExpanded(!expanded)} aria-controls="basic-navbar-nav" />
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
  );
};

export default NavBar;
