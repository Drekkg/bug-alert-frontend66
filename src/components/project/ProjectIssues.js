import React, { useState, useEffect } from "react";
import { Button, Card, Form, Alert, Row, Col } from "react-bootstrap";
import styles from "../../styles/ProjectIssues.module.css";
import LoadingBadge from "../LoadingBadge";
import { Link } from "react-router-dom";
import axios from "axios";

function ProjectIssues({
  onResolvedChange,
  currentUser,
  projectOwner,
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
  const [resolved, setResolved] = useState(false);
  const [issueId, setIssueId] = useState(null);
  const [issue, setIssue] = useState({
    issue: "",
    console_error: "",
    repeatable: false,
    priority: "",
    issue_id: ProjectId,
    resolved: false,
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
        className={styles.showFormButton}
        variant="secondary"
        size="sm"
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
      resolved: false,
    });
    setShowIssueForm(false);
    setShowAlert(true);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/issues/project/${ProjectId}/`)
      .then((response) => setIssueData(response.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [ProjectId, showIssueForm]);

  useEffect(() => {
    issueData.forEach((issue) => {
      if (issue.issue_project_id === ProjectId) {
        setNoIssues(true);
      }
    });
  }, [issueData, ProjectId]);

  const handleResolved = (issueToResolve) => {
    setIssueId(issueToResolve);
    setResolved(true);
    const matchedIssue = issueData.find((issue) => issue.id === issueToResolve);
    matchedIssue.resolved = true;
    setIssueData((prev) => [...prev, matchedIssue]);

    handleResolvePut(issueData);
  };
  const handleResolvePut = async (issueData, projectId) => {
    try {
      const response = await axios.put(`/issues/project/1/`, issueData);
    } catch {}
  };

  const handleOpenResolved = () => {
    setIssueId(null);
    setResolved(false);
  };

  return (
    <div>
      {(currentUser?.length > 0 || currentUser.username) && showFormButton}
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
              placeholder="Please enter none if there are no console errors "
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

      {loading ? (
        <LoadingBadge />
      ) : (
        !noIssues && (
          <Card.Title style={{ margin: "10px 0" }}>No issues Logged for this Project</Card.Title>
        )
      )}
      {issueData
        ?.filter((issue) => issue.issue_project_id === ProjectId)
        .map((issue, index) => {
          let priorityClass = "";
          switch (issue.priority) {
            case "Critical":
              priorityClass = styles.criticalPriority;
              break;
            case "High":
              priorityClass = styles.highPriority;
              break;
            case "Medium":
              priorityClass = styles.mediumPriority;
              break;
            case "Low":
              priorityClass = styles.lowPriority;
              break;
            default:
              priorityClass = "";
          }

          return (
            <Card key={index} className={styles.issueCard}>
              <Card.Title>
                <strong> {projectTitle}</strong> Issue Nr:{" "}
                <span className={styles.issueNr}>
                  ##{issue.id}
                  {issueId === issue.id ? <span className={styles.Resolve}>Resolved</span> : null}
                </span>
              </Card.Title>
              <Card.Text>
                Logged By: <strong>{issue.owner}</strong>
              </Card.Text>
              <Card.Text>
                Issue: <span className={styles.issueText}>{issue.issue}</span>
              </Card.Text>
              <Card.Text>
                Date:<strong>{issue.created_on}</strong>
              </Card.Text>

              <Card.Text>
                Repeatable:<strong> {issue.repeatable ? "Yes" : "No"}</strong>
              </Card.Text>
              <Card.Text>
                Priority Level:{" "}
                <span className={priorityClass}>
                  <strong>{issue.priority}</strong>
                </span>
                <br />
                <br />
              </Card.Text>
              <Row>
                {projectOwner === currentUser.username &&
                  (resolved && issue.id === issueId ? (
                    <Col>
                      <p>Click Here to Re-open the Issue</p>
                      <div>
                        <Button size="sm" onClick={() => handleOpenResolved(issue.id)}>
                          Re-open
                        </Button>
                      </div>
                    </Col>
                  ) : (
                    <Col>
                      <p>Has the issue been Fixed? Click Here</p>
                      <span>
                        <Button size="sm" onClick={() => handleResolved(issue.id)}>
                          Resolved
                        </Button>
                      </span>
                    </Col>
                  ))}
                <Col>
                  <p>Click here to view Details</p>
                  <div>
                    <Link
                      className={styles.issueLink}
                      to={{
                        pathname: `/issueDetail/${issue.id}`,
                        state: { issue, projectTitle, ProjectId },
                      }}
                    >
                      View Issue
                    </Link>
                  </div>
                </Col>
              </Row>
            </Card>
          );
        })}
    </div>
  );
}

export default ProjectIssues;
