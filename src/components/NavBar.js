import React from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
const NavBar = () => {
  const currentUser = "marz Barz";
  // const {expanded, setExpanded, ref} = useClickOutsideToggle();
  const loggedInUser = (

    <>
      
      <Nav className="mr-auto">
        <NavDropdown title="Take Action" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1"  className={styles.NavLink}>Add a Project to Track</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2"  className={styles.NavLink}>View Your Marked Issues</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3"  className={styles.NavLink}>Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4"  className={styles.NavLink}>Separated link</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#home"  className={styles.NavLink}>Log Out</Nav.Link>
      </Nav>
    </>
  );
  const loggedOutUser = (
    <>
      <Router>
      
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
    <div>
    <Navbar bg="light" expand="xl" >
      <Container>
        <Navbar.Brand href="#home">
          Bug Alert<i className="fa-solid fa-crosshairs"></i>
        </Navbar.Brand>
        {currentUser ? (<Nav.Link href="#link">User: {currentUser}</Nav.Link>) : ("")}
        <Navbar.Toggle/>
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
