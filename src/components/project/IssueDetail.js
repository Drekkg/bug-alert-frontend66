import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import styles from "../../styles/Project.module.css";
import axios from "axios";

const IssueDetail = () => {
  const [issueDetailData, setIssueDetailData] = useState()
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
  useEffect(
    () => {
      try {
        axios.get("/comments/").then((response) => setIssueDetailData(response.data));
      } catch { }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

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
        <p><strong>Comments:</strong>{issueDetailData}</p>
        <Button variant="success" onClick={handleBackToIssues}>
          Back to Issues
        </Button>
        <Button variant="success" onClick={handleBackToIssues}>
          Submit Response
        </Button>
        <Form>
          <Form.Group controlId="Comments">
            <Form.Label>Response</Form.Label>
            <Form.Control type="text" placeholder="Enter response" />
            <Form.Text className="text-muted">
              please share any comments or actions that have been taken
            </Form.Text>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default IssueDetail;
