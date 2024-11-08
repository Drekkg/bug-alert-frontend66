import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styles from "../../styles/AddProject.module.css";

function AddProject({ addProject }) {
  const closeForm = () => {
    history.push("/");
  }; // This is a new function that closes the form and redirects to the home page.
  const [project, setProject] = useState({
    id: "",
    projecttitle: "",
    description: "",
    headerImage: "",
    projectUrl: "",
  });
  const history = useHistory();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (project.description && project.projecttitle) {
      addProject(project);
      setProject({
        id: "",
        projecttitle: "",
        description: "",
      });
      history.push("/");
    } else {
      alert("Please fill out the required fields.");
    }
  };

  return (
    <div>
      <Container className={styles.AddProject}>
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
              name="projecttitle"
              value={project.projectTitle}
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
          {/* <Form.Control
            as="select"
            name="priorityLevel"
            onChange={handleChange}
            value={project.priorityLevel}
          >
            <option value="">Choose...</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Control> */}

          <Form.Group>
            <Form.File id="image" label="Upload an Image"
            onChange={handleChange}
            name="headerImage"
            value={project.headerImage}
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
              name="projectUrl"
              value={project.projectUrl}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button variant="warning" className={styles.CloseButton} onClick={closeForm}>
            Close
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddProject;
