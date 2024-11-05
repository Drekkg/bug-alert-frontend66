import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import styles from "../../styles/AddProject.module.css";

function AddProject() {
  const [project, setProject] = useState({
    id: "",
    projectTitle: "",
    description: "",
    priorityLevel: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (project.description && project.priorityLevel && project.projectTitle) {
      setProject((prev) => [...prev, project]);
      alert("Project added successfully.");
      setProject({
        id: "",
        commentary: "",
        additionalInfo: "",
        repeatable: false,
        priorityLevel: "",
        resolved: false,
      });
    } else {
      alert("Please fill out the required fields.");
    }
  };

  return (
    <div>
      <Container className={styles.AddProject}>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="add-project">
            <Form.Label>Project Title </Form.Label>
            <Form.Control
              type="Text"
              maxLength="35"
              onChange={handleChange}
              placeholder="Project Name"
              name="project-title"
              value={project.projectTitle}
            />
            <Form.Text className="text-muted">
              Please enter the name of the project you want to track.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Issue - Bug</Form.Label>
            <Form.Control
              type="text"
              onChange={handleChange}
              maxLength="100"
              placeholder="Issue"
              name="description"
              value={project.description}
            />
            <Form.Text className="text-muted">Please describe the Issue you encountered.</Form.Text>
          </Form.Group>
          <Form.Control
            as="select"
            name="priorityLevel"
            onChange={handleChange}
            value={project.priorityLevel}
          >
            <option value="">Choose...</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Control>

          <Form.Group>
            <Form.File id="image" label="Upload a Screenshot" />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
          <Button variant="warning" href="/home">
            Close
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddProject;
