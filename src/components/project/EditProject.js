import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams, useHistory } from "react-router-dom";
import styles from "../../styles/Project.module.css";
import { axiosReq } from "../../api/axiosDefaults";

const EditProject = ({ updateProject }) => {
  const { projectId } = useParams();

  const history = useHistory();
  const [project, setProject] = useState({
    title: "",
    description: "",
    projectURL: "",
    githubURL: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const handleBackToProjects = () => {
    history.push("/");
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosReq.get(`/projects/`);
        const matchingProject = response.data.find((project) => project.id === parseInt(projectId));
        if (matchingProject) {
          setProject(matchingProject);
        } else {
          // console.error("Project not found");
        }
      } catch (error) {
        // console.error("Error fetching project data:", error);
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
      const response = await axiosReq.put(`/projects/${projectId}/`, project);
      setShowAlert(!showAlert);
      updateProject(response.data);
    } catch (err) {
      if (err.response) {
        // console.error("Error response:", err.response.data);
      } else if (err.request) {
        // console.error("Error request:", err.request);
      } else {
        // console.error("Error message:", err.message);
      }
    }
  };

  const updateAlert = (
    <div className={styles.backdrop}>
      <Alert variant="info" className={styles.alertModal}>
        <Alert.Heading>
          {" "}
          Bug Alert <i className="fa-solid fa-crosshairs"></i>
        </Alert.Heading>
        <p>
          Project Updated Successfully!
          <i className="fa-solid fa-crosshairs"></i>
        </p>
        <Button
          onClick={() => {
            setShowAlert(false);
            history.push("/");
          }}
          variant="info"
          block
        >
          Close
        </Button>
      </Alert>
    </div>
  );

  return (
    <Container className={styles.project}>
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
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Update Project
            </Button>
          </Col>
          <Col>
            <Button variant="info" onClick={handleBackToProjects}>
              Go Back to Projects
            </Button>
          </Col>
        </Row>
      </Form>
      {showAlert && updateAlert}
    </Container>
  );
};

export default EditProject;
