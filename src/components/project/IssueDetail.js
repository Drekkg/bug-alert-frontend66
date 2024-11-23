import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, Row, Col, Alert, NavLink } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import styles from "../../styles/IssueDetail.module.css";
import axios from "axios";
import LoadingBadge from "../LoadingBadge";

const IssueDetail = (currentUser) => {
  const [triggerFetch, setTriggerFetch] = useState(false);
  const [issueDetailData, setIssueDetailData] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();
  const { issue, projectTitle, ProjectId } = location.state || {};
  const priorityClassMap = {
    Critical: styles.criticalPriority,
    High: styles.highPriority,
    Medium: styles.mediumPriority,
    Low: styles.lowPriority,
  };

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
      await axios.post(`/comments/`, enteredDetailData);
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
  const filteredComment = issueDetailData?.filter((comment) => comment.issue_id === issue.id);

  const priorityClass = priorityClassMap[issue.priority];

  return (
    <Container>
      <div className={styles.project}>
        <h4 className={styles.issueNr}>
          {projectTitle}
          <span> ## {issue.id}</span>
        </h4>
        <div className={styles.issueContent}>
          <Row>
            <Col>
              Logged By:
              <span className={styles.colAlign}>
                <strong>{issue.owner}</strong>
              </span>
            </Col>
            <Col></Col>
            <Col>
              Date:
              <span className={styles.colAlign}>
                <strong>{issue.created_on}</strong>
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              Issue Information:{" "}
              <span className={styles.colAlign}>
                <strong>{issue.issue}</strong>
              </span>
            </Col>
          </Row>
          <Row>
            <Col>
              Console Error:
              <span className={styles.colAlign}>
                <strong>{issue.console_error}</strong>
              </span>
            </Col>
          </Row>

          <Row className={styles.rowAlign}>
            <Col>
              Repeatable:
              <span className={styles.colAlign}>
                <strong>{issue.repeatable ? "Yes" : "No"}</strong>
              </span>
            </Col>
            <Col></Col>
            <Col>
              <div className={`${styles.colAlign} ${priorityClass}`}>
                <strong>Priority Level: {issue.priority}</strong>
              </div>
            </Col>
          </Row>
        </div>
        <Button variant="success" className={styles.backToIssueButton} onClick={handleBackToIssues}>
          Back to Issue List
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

          <Button variant="primary" className={styles.enterButton} type="submit">
            Submit
          </Button>
        </Form>
        <div>
          <Card>
            <Card.Title className={styles.commentsHeader}>
              <h3>Comments:</h3>
            </Card.Title>
            {loading && <LoadingBadge />}
            {filteredComment.length > 0 ? (
              filteredComment.map((comment) => (
                <div key={comment.id} className={styles.commentBox}>
                  <p>
                    <strong>Comment:</strong> {comment.comment}
                  </p>
                  <p>
                    <strong>Date:</strong> {comment.created_on} <strong>Logged by:</strong>{" "}
                    {comment.owner}
                  </p>
                  <hr />
                </div>
              ))
            ) : (
              <div>
                <p>No Comments Added</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default IssueDetail;
