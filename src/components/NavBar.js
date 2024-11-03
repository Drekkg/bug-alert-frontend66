import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "../styles/NavBar.module.css";
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

const NavBar = () => {

const currentUser = "Marz Creeper";


    const loggedOutUser = (
<>
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
        <i className="fa-solid fa-right-to-bracket"></i>Sign in
      </NavLink>
</Router>

</>
    )


    const addProject = (
        <Router>
        <NavLink
          className={styles.NavLink}
          activeClassName={styles.Active}
          to="/posts/create"
        >
          <i className="fa-solid fa-folder-plus"></i>Add a Project to Track
        </NavLink>
        </Router>
      );

return (
    <Navbar className={styles.NavBar} fixed="top">
        <Container>
           
                
                <h1>Bug Alert</h1>
                {addProject}
                <h5 className="badge badge-secondary">USER: {currentUser}</h5>
                

</Container>
    </Navbar>
)








}


export default NavBar;