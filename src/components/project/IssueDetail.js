import React from "react";
import { Button, Container } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import styles from "../../styles/Project.module.css";

const IssueDetail = () => {
  const location = useLocation();
  const history = useHistory();
  const { issue } = location.state || {};
  const ProjectId = location.ProjectId;

  const handleBackToIssues = () => {
    history.push({
      pathname: "/",
      state: { reload: true },
      ProjectId: ProjectId,
    });
  };

  return (
    <div>
      <Container className={styles.Project}>
        <h2>Issue Detail</h2>
        <span className={styles.IssueDetail}>Nr: ## {issue.id}</span>
        <p>
          <strong>Logged By:</strong> {issue.owner}
        </p>
        <p>
          <strong>Date:</strong> {issue.created_on}
        </p>
        <p>
          <strong>Issue Information/Console Error:</strong> {issue.console_error}
        </p>
        <p>
          <strong>Repeatable:</strong> {issue.repeatable ? "Yes" : "No"}
        </p>
        <p>
          <strong>Priority Level:</strong> {issue.priority}
        </p>
        <Button variant="success" onClick={handleBackToIssues}>
          Back to Issues
        </Button>
        <Button variant="success" onClick={handleBackToIssues}>
          Submit Response
        </Button>
      </Container>
    </div>
  );
};

export default IssueDetail;
