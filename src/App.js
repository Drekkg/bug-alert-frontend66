import React, { useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectList from "./components/project/ProjectList";
import AddProject from "./components/project/AddProject";

function App() {
  const [projects, setProjects] = useState([]);
  const addProject = (project) => {
    setProjects((prevProjects) => [...prevProjects, project]);
  };

  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" render={() => <ProjectList projects={projects} />} />
        <Route path="/addProject" render={() => <AddProject addProject={addProject} />} />
        <ProjectList />
      </Switch>
    </div>
  );
}

export default App;
