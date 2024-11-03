import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Project.module.css";
import { Container, Button, Card } from "react-bootstrap";
import ProjectIssues from "./ProjectIssues";

function ProjectList() {
  const [issues, setIssues] = useState(false);

  const handleClick = () => {
    setIssues(!issues);
  };

  return (
    <Container className={styles.Project}>
      <Card>
        <Card.Body>
          <Card.Title>Raptor health Tracker</Card.Title>
          <Card.Text>Freedom for Eric the accidentaly dentist</Card.Text>
          <Button variant="primary" onClick={handleClick}>
            Open the issues Panel
          </Button>
        </Card.Body>
      </Card>
      {issues && <ProjectIssues />}
    </Container>
  );
}

export default ProjectList;
