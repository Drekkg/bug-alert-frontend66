import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

const NavBar = () => {




return (
    <Navbar className={styles.NavBar} fixed="top">
        <Container>
        <h1>Bug Alert</h1>
    <Router>
        <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i class="fas fa-user-plus"></i>Sign up
      </NavLink>


      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i class="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>
</Router>
</Container>
    </Navbar>
)








}


export default NavBar;