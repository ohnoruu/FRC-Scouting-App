import React from 'react';
import { Card, Stack, Badge } from 'react-bootstrap';
import './MatchupProfile.css';

export default function MatchupProfile({ robot, allianceColor }) {  
  const hasPlayedRole = (role) => {
    return robot?.matches?.some(
      (match) => 
        match.matchType !== 'Practice Match' &&
        match.playstyle?.[role] === true
    );
  }
    
    return (
        <div className="matchupProfile-container">
            <Card className={`matchupProfile-card matchupProfile-${allianceColor}`}>
                <Card.Body>
                    <Card.Title>{robot.profile?.teamNumber}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{robot.profile?.teamName}</Card.Subtitle>

                    <Stack direction="horizontal" gap={2} style={{flexWrap: 'wrap'}}>
                        {hasPlayedRole('scoring') && <Badge bg="light">Scoring</Badge>}
                        {hasPlayedRole('passing') && <Badge bg="light">Passing</Badge>}
                        {hasPlayedRole('defense') && <Badge bg="light">Defense</Badge>}
                    </Stack>
                </Card.Body>
            </Card>
        </div>
    );
}