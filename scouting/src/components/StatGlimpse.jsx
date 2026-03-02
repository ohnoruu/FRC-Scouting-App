import React, { useState, useEffect } from 'react';
import { Card, Image, Badge, Stack } from 'react-bootstrap';
import fillerImg from '../assets/interface-icons/filler-image.png';
import './StatGlimpse.css';

export default function StatGlimpse({ robot, isLoading }) {
  const [ hovered, setHovered ] = useState(false);
  const img = process.env.REACT_APP_BASE_URL + '/uploads/';

  const computeAvgTotalScore = () => {
    if (!robot?.matches || robot.matches.length === 0) return 'N/A';

    const totalTotalScore = robot.matches.reduce((totalScore, match) => {
        if (match.matchType != 'Practice Match') {
            totalScore += match.totalScore || 0;
        }
        return totalScore;
    }, 0)
    return Math.round(totalTotalScore / robot.matches.filter(m => m.matchType != 'Practice Match').length);
  }

  const hasPlayedRole = (role) => {
    return robot?.matches?.some(
      (match) => 
        match.matchType !== 'Practice Match' &&
        match.playstyle?.[role] === true
    );
  }
  

  return (
    <>
      <Card 
        className="statglimpse-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="statglimpse-text">
          <Card.Title className="statglimpse-header">{robot.profile?.teamNumber} - {robot.profile?.teamName}</Card.Title>
          
          
          <Card.Text className="statglimpse-description">
            Average Total Score: {computeAvgTotalScore()}
          </Card.Text>

          <Stack direction="horizontal" gap={2} style={{flexWrap: 'wrap'}}>
            <Badge bg="primary">{robot.profile?.drivebase}</Badge>
            {robot.profile?.lanePreference.bump && <Badge bg="success">Bump</Badge>}
            {robot.profile?.lanePreference.trench && <Badge bg="success">Trench</Badge>}

            {hasPlayedRole('scoring') && <Badge bg="warning">Scoring</Badge>}
            {hasPlayedRole('passing') && <Badge bg="warning">Passing</Badge>}
            {hasPlayedRole('defense') && <Badge bg="warning">Defense</Badge>}
          </Stack>
        </div>

        <Card.Img 
          variant="bottom" 
          src={
              robot.profile?.robotImages?.[0]
                  ? `${img}${robot.profile.robotImages[0]}`
                  : fillerImg
          }
          alt="Team Filler" 
          className={`statglimpse-image ${hovered ? 'statglimpse-image-hovered' : ''}`} 
        />
      </Card>
    </>
  );
}