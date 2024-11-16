import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import styles from "../../styles/Project.module.css";
import axios from "axios";
import LoadingBadge from "../LoadingBadge";

const IssueDetail = () => {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [issueDetailData, setIssueDetailData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { issue, projectTitle, ProjectId } = location.state || {};

  const [enteredDetailData, setEnteredDetailData] = useState({
    comment: "",
    resolved: false,
    issue_id: issue.id,
  });

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/comments/");
        setIssueDetailData(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [triggerFetch]); //eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/comments/`, enteredDetailData);

      setTriggerFetch(!triggerFetch);
      setEnteredDetailData({
        comment: "",
        resolved: false,
        issue_id: issue.id,
      });
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
    setTriggerFetch((prev) => !prev);
  };

  return (
    <div>
      <Container className={styles.Project}>
        <h4>{projectTitle} Issue Detail</h4>
        <span className={styles.IssueDetail}>Nr: ## {issue.id}</span>
        <p>
          <strong>Logged By:</strong> {issue.owner}
        </p>
        <p>
          <strong>Date:</strong> {issue.created_on}
        </p>
        <p>
          <strong>Issue Information: </strong> {issue.issue}
        </p>
        <p>
          <strong>Console Error:</strong> {issue.console_error}
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
              required
            />
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
        <div>
          <h3>Comments:</h3>
          {loading && <LoadingBadge />}
          {issueDetailData
            ?.filter((comment) => comment.issue_id === issue.id)
            .map((comment) => (
              <div key={comment.id}>
                <p>
                  <strong>Comment:</strong> {comment.comment}
                </p>
                <p>
                  <strong>Resolved:</strong> {comment.resolved ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Date:</strong> {comment.created_on}
                </p>
                <p>
                  <strong>Owner:</strong> {comment.owner}
                </p>
                <p> id: {comment.issue_id} </p>
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default IssueDetail;
