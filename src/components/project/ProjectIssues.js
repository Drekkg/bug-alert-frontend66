import React, { useState, useEffect } from "react";
import { Button, Card, Form, Alert } from "react-bootstrap";
import styles from "../../styles/ProjectIssues.module.css";
import LoadingBadge from "../LoadingBadge";
import { Link } from "react-router-dom";
import axios from "axios";

function ProjectIssues({
  onResolvedChange,
  owner,
  onOpenProject,
  ProjectId,
  routeBack,
  projectTitle,
}) {
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [issueData, setIssueData] = useState([]);
  const [noIssues, setNoIssues] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [issue, setIssue] = useState({
    issue: "",
    console_error: "",
    repeatable: false,
    priority: "",
    issue_id: ProjectId,
  });

  const showIssueFormButton = showIssueForm ? "Close Issue Form" : "Open Issue Form";

  const issueAddAlert = (
    <Alert variant="success">
      <Alert.Heading>Issue Added</Alert.Heading>
      <p>Issue has been added successfully</p>
      <Button onClick={() => setShowAlert(false)} variant="success" block>
        Close
      </Button>
    </Alert>
  );

  const showFormButton = (
    <div style={{ textAlign: "left" }}>
      <Button
        variant="secondary"
        size="sm"
        className="mb-2"
        onClick={() => setShowIssueForm(!showIssueForm)}
      >
        {showIssueFormButton}
      </Button>
    </div>
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIssue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/issues/project/${ProjectId}/`, issue);

      console.log("issue added successfully", response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        console.error("Error request:", err.request);
      } else {
        console.error("Error message:", err.message);
      }
    }

    setIssue({
      issue: "",
      console_error: "",
      repeatable: false,
      priority: "",
      issue_id: ProjectId,
      projectTitle: projectTitle,
    });
    setShowIssueForm(false);
    setShowAlert(true);
  };

  useEffect(
    () => {
      setLoading(true);
      axios
        .get(`/issues/project/${ProjectId}/`)
        .then((response) => setIssueData(response.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [ProjectId, showIssueForm]
  );

  useEffect(() => {
    issueData.forEach((issue) => {
      if (issue.issue_project_id === ProjectId) {
        setNoIssues(true);
      }
    });
  }, [issueData, ProjectId]);

  return (
    <div>
      {(owner?.length > 0 || owner.username) && showFormButton}
      {showAlert && issueAddAlert}
      {showIssueForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="issue">
            <Form.Label>Issue:</Form.Label>
            <Form.Control
              type="text"
              maxLength="200"
              placeholder="Please describe the issue"
              name="issue"
              onChange={handleChange}
              value={issue.issue}
              required
            />
          </Form.Group>
          <Form.Group controlId="console_error">
            <Form.Label>Console Error:</Form.Label>
            <Form.Control
              type="text"
              maxLength="200"
              placeholder="Paste in any console errors etc "
              name="console_error"
              onChange={handleChange}
              value={issue.console_error}
              required
            />
          </Form.Group>

          <Form.Group controlId="Repeatable">
            <Form.Check
              type="checkbox"
              label="Repeatable"
              name="repeatable"
              checked={issue.repeatable || false}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="PriorityLevel">
            <Form.Label>Priority Level</Form.Label>
            <Form.Control
              as="select"
              name="priority"
              onChange={handleChange}
              value={issue.priority}
              required
            >
              <option value="">Choose...</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Control>
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      )}
      <div>
        {loading ? (
          <LoadingBadge />
        ) : (
          !noIssues && (
            <Card.Title style={{ margin: "10px 0" }}>No issues Logged for this Project</Card.Title>
          )
        )}
        {issueData
          ?.filter((issue) => issue.issue_project_id === ProjectId)
          .map((issue, index) => (
            <Card key={index} className={styles.issueCard}>
              <Card.Body>
                <Card.Title>
                  {projectTitle} <strong>Issue Nr: ##{issue.id}</strong>
                </Card.Title>
                <Card.Text>
                  <strong>Logged By:</strong> {issue.owner}
                </Card.Text>
                <Card.Text>
                  <strong>Issue:</strong> {issue.issue}
                </Card.Text>
                <Card.Text>
                  <strong>Date:</strong> {issue.created_on}
                </Card.Text>

                <Card.Text>
                  <strong>Repeatable:</strong> {issue.repeatable ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>Priority Level:</strong> {issue.priority}
                </Card.Text>
                {/* <Card.Text>
                            <strong>Resolved:</strong> {issue.resolved ? "Yes" : "No"}
                          </Card.Text> */}
                <Link
                  to={{
                    pathname: `/issueDetail/${issue.id}`,
                    state: { issue, projectTitle, ProjectId },
                  }}
                >
                  View Issue
                </Link>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default ProjectIssues;
