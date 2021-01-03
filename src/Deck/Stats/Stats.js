import React from 'react';
import { Card } from 'react-bootstrap'


export default function Stats() {


  return (
    <div>

      <Card style={{ width: '25rem', margin: '0 auto', backgroundColor: 'rgba(200, 168, 115, 0.95)'}}>
        <Card.Body>
          <Card.Title style={{border: '1px solid black'}}>Stats</Card.Title>

          <Card.Text>
          <div style={{fontWeight: 'bold'}}>
            Today's study breakdown
          </div>
    </Card.Text>
        </Card.Body>
      </Card>

    </div>
  )
}