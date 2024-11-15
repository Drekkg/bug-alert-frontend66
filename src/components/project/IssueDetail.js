import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import styles from "../../styles/Project.module.css";
import axios from "axios";

const IssueDetail = () => {
  const [issueDetailData, setIssueDetailData] = useState([])
  const [enteredDetailData, setEnteredDetailData] = useState({
    comment: "",
    resolved: false,
  });
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEnteredDetailData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(
    () => {
      try {
        axios.get("/comments/").then((response) => setIssueDetailData(response.data));
        console.log("effected")
      } catch { }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [enteredDetailData]
  );



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/comments/", enteredDetailData);
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
  }



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

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Comments">
            <Form.Label>Response</Form.Label>
            <Form.Control
              placeholder="Enter response"
              type="text"
              maxLength="200"
              name="comment"
              onChange={handleChange}
              value={enteredDetailData.comment}
              required />
            <Form.Text className="text-muted">
              please share any comments or actions that have been taken
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="Resolved">
            <Form.Check
              type="checkbox"
              label="Issue is Resolved"
              name="resolved"
              onChange={handleChange}
              checked={enteredDetailData.resolved}
            />
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
