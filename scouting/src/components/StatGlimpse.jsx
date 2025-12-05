import React, { useState, useEffect } from 'react';
import { Card, Image, Badge } from 'react-bootstrap';
import fillerImage from '../assets/interface-icons/filler-image.png';
import './StatGlimpse.css';

export default function StatGlimpse({ name, teamNumber, playstyle = [], isLoading }) {
  const [ hovered, setHovered ] = useState(false);

  const hasPlaystyles = Array.isArray(playstyle) && playstyle.length > 0;

  return (
    <>
      <Card 
        className="statglimpse-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="statglimpse-text">
          <Card.Title className="statglimpse-header">{teamNumber} - {name}</Card.Title>

          <Card.Text className="statglimpse-description">
            {hasPlaystyles &&
              playstyle.map((p, idx) => (
                <Badge
                  key={`${p}-${idx}`}
                  bg="secondary"
                  className="me-2"
                >
                  {p}
                </Badge>
              ))
            }
          </Card.Text>
        </div>

        <Card.Img 
          variant="bottom" 
          src={fillerImage} 
          alt="Team Filler" 
          className={`statglimpse-image ${hovered ? 'statglimpse-image-hovered' : ''}`} 
        />
      </Card>
    </>
  );
}