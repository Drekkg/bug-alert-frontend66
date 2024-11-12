import React, { useState, useEffect } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../../styles/ProjectIssues.module.css";
import axios from "axios";

function ProjectIssues({ onResolvedChange, owner, ProjectId }) {
  console.log(ProjectId);
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [issueData, setIssueData] = useState([]);
  const [issue, setIssue] = useState({
    issue: "",
    console_error: "",
    repeatable: false,
    priority: "",
    issue_id: ProjectId,
  });

  const [issueToList, setIssueToList] = useState([]);
  const date = new Date().toLocaleDateString();
  const showIssueFormButton = showIssueForm ? "Close Issue Form" : "Open Issue Form";

  const showFormButton = (
    <>
      <Button
        variant="secondary"
        className={styles.responseButton}
        onClick={() => setShowIssueForm(!showIssueForm)}
      >
        {showIssueFormButton}
      </Button>
    </>
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIssue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log(issue);
    e.preventDefault();
    try {
      const response = await axios.post(`/issues/project/${ProjectId}/`, issue);
      console.log("issue added successfully", response.data);
    } catch (err) {
      console.log(err);
      if (err.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", err.response.data);
      } else if (err.request) {
        // Request was made but no response received
        console.error("Error request:", err.request);
      } else {
        // Something else happened while setting up the request
        console.error("Error message:", err.message);
      }
    }

    // if (issue.resolved === true) {
    //   onResolvedChange(true);
    // }
    // setIssue({
    //   issue: "",
    //   console_error: "",
    //   repeatable: false,
    //   priority: "",
    //   // resolved: false,
    // });
    // setIssueToList((prev) => [...prev, issue]);
    setShowIssueForm(false);
  };

  useEffect(() => {
    try {
      axios.get(`/issues/project/${ProjectId}/`).then((response) => setIssueData(response.data));
    } catch {}
  }, [ProjectId]);
  console.log(issueData[1]);

  return (
    <div>
      {(owner.length > 0 || owner.username) && showFormButton}
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
          {/* 
          <Form.Group controlId="AdditionalInfo">
            <Form.Label>Additional Info</Form.Label>
            <Form.Control
              type="text"
              placeholder="Additional Information"
              name="additionalInfo"
              onChange={handleChange}
              value={issue.additionalInfo}
              required
            />
          </Form.Group> */}

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
              <option value="Critical">Low</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Control>
          </Form.Group>

          {/* <Form.Group controlId="Resolved">
            <Form.Check
              type="checkbox"
              label="Issue is Resolved"
              name="resolved"
              onChange={handleChange}
              checked={issue.resolved}
            />
          </Form.Group> */}

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      )}{" "}
      {issueData.length > 0 && (
        <div>
          {issueData
            ?.filter((issue) => issue.issue_project_id === ProjectId)
            .map((issue, index) => (
              <Card key={index} style={{ margin: "10px 0" }}>
                <Card.Body>
                  <Card.Title>Issue {index + 1}</Card.Title>
                  <Card.Text>
                    <strong>Logged By:</strong> {issue.issue}
                  </Card.Text>
                  <Card.Text>
                    <strong>Date:</strong> {date}
                    <strong>Issue Information:</strong> {issue.console_error}
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
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

export default ProjectIssues;
