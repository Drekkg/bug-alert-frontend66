import React, { useState } from "react";

import styles from "../../styles/Project.module.css";
import { Container, Button, Card } from "react-bootstrap";
import ProjectIssues from "./ProjectIssues";

function ProjectList({ projects, currentUser }) {
  const [issues, setIssues] = useState(false);
  const issuesPanelButton = issues ? "Close the issues Panel" : "Open the issues Panel";
  const date = new Date().toLocaleDateString();

  const handleClick = () => {
    setIssues(!issues);
  };

  //   return projects.map((project) => (
  //     <Container className={styles.Project}>
  //       <Card>
  //         <Card.Body>
  //           <Card.Title>{project.title}</Card.Title>
  //           <Card.Text>{project.description}</Card.Text>
  //           <Button variant="primary" onClick={handleClick}>
  //             {issuesPanelButton}
  //           </Button>
  //         </Card.Body>
  //       </Card>
  //       {issues && <ProjectIssues />}
  //     </Container>
  //   ));
  // }
  return (
    <Container className={styles.Project}>
      <h2>
        Bug Alert<i className="fa-solid fa-crosshairs"></i>
      </h2>
      {projects.map((project, index) => (
        <Card key={index} className={styles.projectCard}>
          <Card.Body className={styles.projectCardBody}>
            <Card.Title>project: {project.projecttitle}</Card.Title>
            <Card.Text>Issue: {project.description}</Card.Text>
            <Card.Text>Logged By: {currentUser.username}</Card.Text>
            <Card.Text>priority: {project.priorityLevel}</Card.Text>
            <Card.Text>Date Logged {date}</Card.Text>
            <Button variant="primary" onClick={handleClick}>
              {issuesPanelButton}
            </Button>
            {issues && <ProjectIssues />}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ProjectList;
