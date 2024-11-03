import React, { useState } from "react";
import { Container, Button, Card, Form } from "react-bootstrap";

function ProjectIssues() {
  const [showRespondForm, setShowRespondForm] = useState(false);
  const [response, setResponse] = useState({
    id: "",
    commentary: "",
    additionalInfo: "",
    repeatable: false,
    priorityLevel: "",
    resolved: false,
  });
  const [issues, setIssues] = useState([{}]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setResponse((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIssues((prev) => [...prev, response]);
    setShowRespondForm(false);
    console.log(issues[0]);
  };

  return (
    <div>
      <Button variant="primary" onClick={() => setShowRespondForm(!showRespondForm)}>
        Response Form
      </Button>
      {showRespondForm ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="Commentary">
            <Form.Label>Commentary</Form.Label>
            <Form.Control
              type="text"
              placeholder="Your Comments"
              name="commentary"
              onChange={handleChange}
              value={response.commentary}
            />
          </Form.Group>

          <Form.Group controlId="AdditionalInfo">
            <Form.Label>Additional Info</Form.Label>
            <Form.Control
              type="text"
              placeholder="Additional Information"
              name="additionalInfo"
              onChange={handleChange}
              value={response.additionalInfo}
            />
          </Form.Group>

          <Form.Group controlId="Repeatable">
            <Form.Check
              type="checkbox"
              label="Repeatable"
              name="repeatable"
              onChange={handleChange}
              checked={response.repeatable}
            />
          </Form.Group>

          <Form.Group controlId="PriorityLevel">
            <Form.Label>Priority Level</Form.Label>
            <Form.Control
              as="select"
              name="priorityLevel"
              onChange={handleChange}
              value={response.priorityLevel}
            >
              <option value="">Choose...</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="Resolved">
            <Form.Check
              type="checkbox"
              label="Issue is Resolved"
              name="resolved"
              onChange={handleChange}
              checked={response.resolved}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      ) : (
        <div>
          {issues.length &&
            issues.map((issue, index) => (
              <Card key={index} style={{ margin: "10px 0" }}>
                <Card.Body>
                  <Card.Title>Issue {index + 1}</Card.Title>
                  <Card.Text>
                    <strong>Commentary:</strong> {issue.commentary}
                  </Card.Text>
                  <Card.Text>
                    <strong>Additional Info:</strong> {issue.additionalInfo}
                  </Card.Text>
                  <Card.Text>
                    <strong>Repeatable:</strong> {issue.repeatable ? "Yes" : "No"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Priority Level:</strong> {issue.priorityLevel}
                  </Card.Text>
                  <Card.Text>
                    <strong>Resolved:</strong> {issue.resolved ? "Yes" : "No"}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}

export default ProjectIssues;
