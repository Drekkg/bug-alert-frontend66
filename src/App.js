import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectList from "./components/project/ProjectList";
import AddProject from "./components/project/AddProject";
import SignUpForm from "./auth/SignUpForm";
import SignInForm from "./auth/SignInForm";
import "./api/axiosDefaults";

function App() {
  const [projects, setProjects] = useState([]);
  const addProject = (project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  const [currentUser, setCurrentUser] = useState([]);
  const addUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <div>
      <NavBar currentUser={currentUser} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <ProjectList projects={projects} currentUser={currentUser} />}
        />
        <Route path="/addProject" render={() => <AddProject addProject={addProject} />} />
        <Route path="/signupform" render={() => <SignUpForm />} />
        <Route exact path="/signinform" render={() => <SignInForm addUser={addUser} />} />
        <ProjectList />
      </Switch>
    </div>
  );
}

export default App;
