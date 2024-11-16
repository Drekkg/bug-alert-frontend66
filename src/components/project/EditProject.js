import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/Project.module.css";

const EditProject = ({ updateProject }) => {
  const { projectId } = useParams();

  const history = useHistory();
  const [project, setProject] = useState([
    {
      title: "",
      description: "",
      projectURL: "",
      githubURL: "",
    },
  ]);

  const [showAlert, setShowAlert] = useState(false);
  const handleBackToProjects = () => {
    history.push("/");
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/projects/`);
        const matchingProject = response.data.find((project) => project.id === parseInt(projectId));
        if (matchingProject) {
          setProject(matchingProject);
        } else {
          console.error("Project not found");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProject();
  }, [projectId]);

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
      const response = await axios.put(`/projects/${projectId}/`, project);
      console.log(response);

      setShowAlert(true);
      updateProject(response.data);
      history.push("/");
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error("Error request:", err.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error message:", err.message);
      }
    }
  };

  return (
    <Container className={styles.Project}>
      <h2>Edit Project</h2>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project title"
            name="title"
            value={project.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter project description"
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="projectURL">
          <Form.Label>Project URL:</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter project URL"
            name="projectURL"
            value={project.projectURL}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="githubURL">
          <Form.Label>GitHub URL:</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter GitHub URL"
            name="githubURL"
            value={project.githubURL}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Project
        </Button>
        <Button variant="info" onClick={handleBackToProjects}>
          Go Back to Projects
        </Button>
      </Form>
      {showAlert && <div className="alert alert-success">Project updated successfully!</div>}
    </Container>
  );
};

export default EditProject;
