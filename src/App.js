import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectList from "./components/project/ProjectList";
import AddProject from "./components/project/AddProject";
import EditProject from "./components/project/EditProject";
import SignUpForm from "./auth/SignUpForm";
import SignInForm from "./auth/SignInForm";
import IssueDetail from "./components/project/IssueDetail";
import "./api/axiosDefaults";

function App() {
  const [projects, setProjects] = useState([]);
  const addProject = (project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };
  const updateProject = (updatedProject) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => (project.id === updatedProject.id ? updatedProject : project))
    );
  };

  const [currentUser, setCurrentUser] = useState([]);
  const addUser = (user) => {
    setCurrentUser(user);
  };
  const logUserOut = () => setCurrentUser([]);

  return (
    <div>
      <NavBar currentUser={currentUser} logUserOut={logUserOut} />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <ProjectList projects={projects} currentUser={currentUser} />}
        />
        <Route path="/addProject" render={() => <AddProject addProject={addProject} />} />

        <Route
          path="/edit-project/:projectId"
          render={() => <EditProject updateProject={updateProject} />}
        />
        <Route path="/signupform" render={() => <SignUpForm />} />
        <Route exact path="/signinform" render={() => <SignInForm addUser={addUser} />} />
        <Route path="/issueDetail/:id" component={IssueDetail} />
      </Switch>
    </div>
  );
}

export default App;
