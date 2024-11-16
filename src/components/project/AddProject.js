import React, { useState } from "react";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "../../styles/AddProject.module.css";
import axios from "axios";

function AddProject({ addProject }) {
  const closeForm = () => {
    history.push("/");
  };
  const handleClickAlert = () => {
    setShowAlert(false);
    history.push("/");
  };
  const [project, setProject] = useState({
    title: "",
    description: "",
    projectURL: "",
    githubURL: "",
  });
  const history = useHistory();
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/projects/", project);
      console.log(response);

      setShowAlert(true);
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
      } else if (err.request) {
        // Request was made but no response received
        console.error("Error request:", err.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error message:", err.message);
      }
    }
    addProject(project);
    setProject({
      title: "",
      description: "",
      projectURL: "",
      githubURL: "",
    });
  };
  const addProjectAlert = (
    <Alert variant="success">
      <Alert.Heading>Project Deleted</Alert.Heading>
      <p>The Project has been added successfully</p>
      <button onClick={handleClickAlert}>Close</button>
    </Alert>
  );

  return (
    <div>
      <Container className={styles.AddProject}>
        {showAlert && addProjectAlert}
        {!showAlert && (
          <div>
            <h2>Add a Project</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="add-project">
                <Form.Label>Project Title </Form.Label>
                <Form.Text className="text-muted">
                  Please enter the name of the project you want to track.
                </Form.Text>
                <Form.Control
                  type="text"
                  maxLength="35"
                  onChange={handleChange}
                  placeholder="Project Name"
                  name="title"
                  value={project.title}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Project Description</Form.Label>
                <Form.Text className="text-muted">
                  Please give a brief description of the application..
                </Form.Text>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  maxLength="150"
                  placeholder="Project Description"
                  name="description"
                  value={project.description}
                />
              </Form.Group>

              <Form.Group controlId="projectUrl">
                <Form.Label>Project URL</Form.Label>
                <Form.Text className="text-muted">
                  Please paste the Project's URL: https://www.example.com
                </Form.Text>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  maxLength="150"
                  placeholder="Project URL"
                  name="projectURL"
                  value={project.projectURL}
                />
              </Form.Group>
              <Form.Group controlId="githubUrl">
                <Form.Label>GitHub URL</Form.Label>
                <Form.Text className="text-muted">
                  Please paste the Project's GitHub URL: https://github.com/...
                </Form.Text>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  maxLength="150"
                  placeholder="Project URL"
                  name="githubURL"
                  value={project.githubURL}
                />
              </Form.Group>

              <Button variant="success" type="submit">
                Submit
              </Button>
              <Button variant="warning" className={styles.CloseButton} onClick={closeForm}>
                Close
              </Button>
            </Form>
          </div>
        )}
      </Container>
    </div>
  );
}

export default AddProject;
