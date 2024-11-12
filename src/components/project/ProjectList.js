import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/Project.module.css";
import { Container, Button, Card } from "react-bootstrap";
import ProjectIssues from "./ProjectIssues";

function ProjectList({ projects, currentUser }) {
  const [issues, setIssues] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [openProjectId, setOpenProjectId] = useState(null);

  const handleClick = (projectId) => {
    setOpenProjectId(openProjectId === projectId ? null : projectId);
  };
  const handleResolvedChange = (resolved) => {
    setResolved(resolved);
  };

  useEffect(() => {
    try {
      axios.get("/projects/").then((response) => setProjectData(response.data));
    } catch {}
  }, [projects.id]);

  return (
    <Container className={styles.Project}>
      <h2>
        Bug Alert<i className="fa-solid fa-crosshairs"></i>
      </h2>
      {projectData?.map((project, index) => (
        <Card key={project.id} className={styles.projectCard}>
          <Card.Body className={styles.projectCardBody}>
            <Card.Title>Project: {project.title}</Card.Title>
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

            <Card.Text>Added By: {project.owner}</Card.Text>
            <Card.Text>Date Logged {project.created_on}</Card.Text>
            <Button variant="primary" onClick={() => handleClick(project.id)}>
              {openProjectId === project.id ? "Close the issues Panel" : "Open the issues Panel"}
            </Button>

            {openProjectId === project.id && (
              <ProjectIssues onResolvedChange={handleResolvedChange} />
            )}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ProjectList;
