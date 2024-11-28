import React, { useState, useEffect } from "react";
import styles from "../../styles/Project.module.css";
import { Container, Button, Card, Modal, Alert } from "react-bootstrap";
import ProjectIssues from "./ProjectIssues";
import { useLocation, useHistory, NavLink } from "react-router-dom";
import LoadingBadge from "../LoadingBadge";
import { useLoggedinUser } from "../../contexts/CurrentUserContext";
import { axiosReq, axiosRes } from "../../api/axiosDefaults";

function ProjectList({ projects, currentUser }) {
  const [projectData, setProjectData] = useState(null);
  const [openProjectId, setOpenProjectId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [deleteProjectId, setDeleteProjectId] = useState(null);
  const [triggerEffect, setTriggerEffect] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [backgroundChange, setBackgroundChange] = useState(false);
  const history = useHistory();
  const loggedUser = useLoggedinUser();

  const handleClose = () => setShowDeleteModal(false);

  const handleClick = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
    setBackgroundChange(!backgroundChange);
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
      await axiosRes.delete(`projects/${deleteProjectId}/`);
      setShowDeleteModal(false);
      setTriggerEffect(!triggerEffect);
      setShowAlert(true);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    axiosReq
      .get("/projects/")
      .then((response) => setProjectData(response.data))
      .catch((error) => console.error("Error fetching project data:", error))
      .finally(() => setLoading(false));
  }, [projects, triggerEffect]);

  const deleteAlert = (
    <div className={styles.Backdrop}>
      <Alert variant="danger">
        <Alert.Heading>Project Deleted</Alert.Heading>
        <p>The Project has been deleted successfully</p>
        <button onClick={() => setShowAlert(false)}>Close</button>
      </Alert>
    </div>
  );

  return (
    <Container className={styles.Project}>
      {Loading && <LoadingBadge />}
      <h2>
        Bug Alert<i className="fa-solid fa-crosshairs"></i>
        <span>Keep track of what needs to be fixed</span>
      </h2>
      {!loggedUser?.username && (
        <h4 className={styles.banner}>
          Please{" "}
          <NavLink className={styles.navBarLinks} to="/signinform">
            Sign in
          </NavLink>{" "}
          or{" "}
          <NavLink to="/signupform" className={styles.navBarLinks}>
            Sign up
          </NavLink>{" "}
          to Experience more...{" "}
        </h4>
      )}
      {showDeleteModal && (
        <Modal show={showDeleteModal} onHide={handleClose} backdrop="static">
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
            <div>
              <Card.Text>
                <span>Project Description: </span>
                {project.description}
              </Card.Text>
              <Card.Text>
                <span> Project URL:</span>
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
                <span> GitHub URL:</span>
                <a
                  href={project.githubURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Link to Github"
                >
                  {project.githubURL}
                </a>
              </Card.Text>

              <Card.Text>
                <span>Added By: </span>
                {project.owner}
              </Card.Text>
              <Card.Text>
                <span>Date Logged: </span>
                {project.created_on}
              </Card.Text>
            </div>
            <div className={styles.buttonContainer}>
              {loggedUser?.username && (
                <div className={`d-flex justify-content-center`}>
                  <Button
                    className={styles.issueButton}
                    variant="primary"
                    onClick={() => handleClick(project.id)}
                  >
                    {openProjectId === project.id
                      ? "Close the issues Panel"
                      : "Open the issues Panel"}
                  </Button>
                </div>
              )}

              {loggedUser?.username === project.owner && (
                <>
                  <Button
                    className={styles.deleteButton}
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(project.id, project.title)}
                  >
                    Delete Project
                  </Button>
                  <Button
                    size="sm"
                    className={styles.editButton}
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
                </>
              )}

              {openProjectId === project.id && (
                <ProjectIssues
                  currentUser={loggedUser}
                  ProjectId={project.id}
                  routeBack={handleRouteBack}
                  projectTitle={project.title}
                  projectOwner={project.owner}
                />
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ProjectList;
