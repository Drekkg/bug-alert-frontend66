import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import styles from "../../styles/ProjectIssues.module.css";

function ProjectIssues({ onResolvedChange }) {
  const [showIssueForm, setShowIssueForm] = useState(false);
  const [issue, setIssue] = useState({
    id: "",
    loggedby: "",
    issueInformation: "",
    repeatable: false,
    priorityLevel: "",
    issueImage: "",
  });
  const [issueToList, setIssueToList] = useState([]);
  const date = new Date().toLocaleDateString();

  const showIssueFormButton = showIssueForm ? "Close Issue Form" : "Open Issue Form";
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setIssue((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issue.issueInformation && issue.priorityLevel) {
      setIssueToList((prev) => [...prev, issue]);
      setShowIssueForm(false);

      if (issue.resolved === true) {
        onResolvedChange(true);
      }
      setIssue({
        id: "",
        commentary: "",
        additionalInfo: "",
        repeatable: false,
        priorityLevel: "",
        resolved: false,
      });
    } else {
      alert("Please fill out the required fields.");
    }
  };
  return (
    <div>
      <Button
        variant="secondary"
        className={styles.responseButton}
        onClick={() => setShowIssueForm(!showIssueForm)}
      >
        {showIssueFormButton}
      </Button>
      {showIssueForm && (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Commentary">
            <Form.Label>Issue:</Form.Label>
            <Form.Control
              type="text"
              maxLength="200"
              placeholder="Please describe the issue"
              name="issueInformation"
              onChange={handleChange}
              value={issue.issueInformation}
              required
            />
          </Form.Group>

          {/* <Form.Group controlId="AdditionalInfo">
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
              onChange={handleChange}
              checked={issue.repeatable}
            />
          </Form.Group>

          <Form.Group controlId="PriorityLevel">
            <Form.Label>Priority Level</Form.Label>
            <Form.Control
              as="select"
              name="priorityLevel"
              onChange={handleChange}
              value={issue.priorityLevel}
              required
            >
              <option value="">Choose...</option>
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
          <Form.Group>
            <Form.File
              id="image"
              label="Upload an Image"
              onChange={handleChange}
              name="issueImage"
              value={issue.issueImage}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      )}{" "}
      {issueToList.length > 0 && (
        <div>
          {issueToList.map((issue, index) => (
            <Card key={index} style={{ margin: "10px 0" }}>
              <Card.Body>
                <Card.Title>Issue {index + 1}</Card.Title>
                <Card.Text>
                  <strong>Logged By:</strong> {issue.loggedby}
                </Card.Text>
                <Card.Text>
                  <strong>Date:</strong> {date}
                  <strong>Issue Information:</strong> {issue.issueInformation}
                </Card.Text>
                <Card.Text>
                  <strong>Image:</strong>
                  <img src={issue.issueImage} alt="Issue" />
                </Card.Text>
                <Card.Text>
                  <strong>Repeatable:</strong> {issue.repeatable ? "Yes" : "No"}
                </Card.Text>
                <Card.Text>
                  <strong>Priority Level:</strong> {issue.priorityLevel}
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
