import "./App.css";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectList from "./components/project/ProjectList";
import AddProject from "./components/project/AddProject";

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/addProject" render={() => <AddProject />} />
        {/* <Route exact path="/home" render={() => <ProjectList />} /> */}
      <ProjectList />
      </Switch>
    </div>
  );
}

export default App;
