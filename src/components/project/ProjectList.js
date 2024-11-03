import React from 'react'
import styles from "../../styles/Project.module.css"
import {Container, Button, Card } from 'react-bootstrap'

function ProjectList() {





  return (
<Container className={styles.Project}>
<Card >
  <Card.Body>
    <Card.Title>Raptor health Tracker</Card.Title>
    <Card.Text>
    Freedom for Eric the accidentaly dentist
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
</Container>
  )
}

export default ProjectList