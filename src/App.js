import "./App.css";
import { BrowserRouter as Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProjectList from "./components/project/ProjectList";
import AddProject from "./components/project/AddProject";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/addProject" render={() => <AddProject />} />
        <Route exact path="/home" render={() => <ProjectList />} />
      </Switch>
    </div>
  );
}

export default App;
