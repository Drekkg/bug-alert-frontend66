import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Project.module.css";
import { Container, Button, Card, Modal, Alert } from "react-bootstrap";
import ProjectIssues from "./ProjectIssues";
import { useLocation, useHistory } from "react-router-dom";
import LoadingBadge from "../LoadingBadge";

function ProjectList({ projects, currentUser }) {
  const [resolved, setResolved] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [Loading, setLoading] = useState(true);
  const history = useHistory();

  const handleClose = () => setShowDeleteModal(false);
  // const handleShow = () => setShowDeleteModal(true);

  const handleClick = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };
  const handleResolvedChange = (resolved) => {
    setResolved(resolved);
  };

  const location = useLocation();
  const ProjectIdProp = location.ProjectId;

  useEffect(() => {
    if (ProjectIdProp) {
      handleClick(ProjectIdProp);
    }
  }, [ProjectIdProp]); //eslint-disable-line

  const handleRouteBack = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };
  const handleEdit = (projectId) => {
    history.push(`/edit-project/${projectId}`);
  };

  const handleDelete = (projectId, title) => {
    setDeleteTitle(title);
    setDeleteProjectId(projectId);
    setShowDeleteModal(true);
  };

  const deleteProject = async (deleteProjectId) => {
    try {
      await axios.delete(`projects/${deleteProjectId}/`);
      setShowDeleteModal(false);
      setTriggerEffect(!triggerEffect);
      setShowAlert(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("/projects/")
      .then((response) => setProjectData(response.data))
      .catch((error) => console.error("Error fetching project data:", error))
      .finally(() => setLoading(false));
  }, [projects, triggerEffect]);

  const deleteAlert = (
    <Alert variant="danger">
      <Alert.Heading>Project Deleted</Alert.Heading>
      <p>The Project has been deleted successfully</p>
      <button onClick={() => setShowAlert(false)}>Close</button>
    </Alert>
  );

  return (
    <Container className={styles.Project}>
      {Loading && <LoadingBadge />}
      <h2>
        Bug Alert<i className="fa-solid fa-crosshairs"></i>
      </h2>
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{deleteTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you Sure you Want to Delete {deleteTitle}!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Go Back!
            </Button>
            <Button variant="danger" onClick={() => deleteProject(deleteProjectId)}>
              Delete Project!
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {showAlert && deleteAlert}

      {projectData?.map((project) => (
        <Card key={project.id} className={styles.projectCard} bg="light">
          <Card.Body className={styles.projectCardBody}>
            <Card.Header className="mb-3">
              <i className="fa-solid fa-crosshairs"></i>
              {project.title}
            </Card.Header>

            {resolved && <Card.Title>RESOLVED</Card.Title>}
            <Card.Text>Project Description: {project.description}</Card.Text>
            <Card.Text>
              Project URL:
              <a
                href={project.projectURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to Project"
              >
                {project.projectURL}
              </a>
            </Card.Text>
            <Card.Text>
              GitHub URL:
              <a
                href={project.githubURL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to Github"
              >
                {project.githubURL}
              </a>
            </Card.Text>

            <Card.Text>Added By: {project.owner}</Card.Text>
            <Card.Text>Date Logged {project.created_on}</Card.Text>

            {currentUser.username && (
              <Button variant="primary" onClick={() => handleClick(project.id)}>
                {openProjectId === project.id ? "Close the issues Panel" : "Open the issues Panel"}
              </Button>
            )}

            {currentUser.username === project.owner && (
              <>
                <Button
                  variant="info"
                  onClick={() =>
                    handleEdit(
                      project.id,
                      project.title,
                      project.description,
                      project.githubURL,
                      project.projectURL
                    )
                  }
                >
                  Edit Project
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(project.id, project.title)}
                >
                  Delete Project
                </Button>
              </>
            )}

            {openProjectId === project.id && (
              <ProjectIssues
                onResolvedChange={handleResolvedChange}
                owner={currentUser}
                ProjectId={project.id}
                routeBack={handleRouteBack}
                projectTitle={project.title}
              />
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ProjectList;
