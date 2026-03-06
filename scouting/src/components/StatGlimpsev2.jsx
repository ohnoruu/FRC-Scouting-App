import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Stack, Badge, Button } from 'react-bootstrap';
import fillerImg from '../assets/interface-icons/filler-image.png';
import './StatGlimpsev2.css';

export default function StatGlimpsev2({ robot, allianceColor }){
    const [ hovered, setHovered ] = useState(false);
    const navigate = useNavigate();
    const img = process.env.REACT_APP_BASE_URL + '/uploads/';

    const handleProfileNavigation = (teamNumber) => {
        navigate(`/navigator/search/profile/${teamNumber}`);
    }

    const computeAvgAutoScore = () => {
        if (!robot?.matches || robot.matches.length === 0) return 'N/A';

        const totalAutoScore = robot.matches.reduce((autoScore, match) => {
            if (match.matchType != 'Practice Match') {
                autoScore += match.autoScore || 0;
            }
            return autoScore;
        }, 0)
        return Math.round(totalAutoScore / robot.matches.filter(m => m.matchType != 'Practice Match').length);
    }

    const computeAvgTeleopScore = () => {
        if (!robot?.matches || robot.matches.length === 0) return 'N/A';

        const totalTeleopScore = robot.matches.reduce((teleopScore, match) => {
            if (match.matchType != 'Practice Match') {
                teleopScore += match.teleopScore || 0;
            }
            return teleopScore;
        }, 0)
        return Math.round(totalTeleopScore / robot.matches.filter(m => m.matchType != 'Practice Match').length);
    }

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
                className="statglimpsev2-card"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="statglimpsev2-text">
                    <Card.Title 
                        className={
                            `statglimpsev2-header ${
                                allianceColor === 'red' 
                                ? 'statglimpsev2-red' 
                                : 'statglimpsev2-blue'
                            }`
                        }
                    >
                        {robot.profile?.teamNumber}
                    </Card.Title>

                    <Card.Subtitle
                        className={
                            `statglimpsev2-subtitle ${
                                allianceColor === 'red' 
                                ? 'statglimpsev2-red' 
                                : 'statglimpsev2-blue'
                            }`
                        }
                    >
                        {robot.profile?.teamName}
                    </Card.Subtitle>

                    <Card.Text className="statglimpsev2-description">
                        Average Auto Score: {computeAvgAutoScore()}
                    </Card.Text>
                    <Card.Text className="statglimpsev2-description">
                        Average Teleop Score: {computeAvgTeleopScore()}
                    </Card.Text>
                    <Card.Text className="statglimpsev2-description" style={{marginBottom: '0.5rem'}}>
                        Average Total Score: {computeAvgTotalScore()}
                    </Card.Text>

                    <Stack direction="horizontal" gap={2} style={{flexWrap: 'wrap'}}>
                        <Badge bg="primary">{robot.profile?.drivebase}</Badge>
                        {robot.profile?.lanePreference.bump && <Badge bg="success">Can Traverse Bump</Badge>}
                        {robot.profile?.lanePreference.trench && <Badge bg="success">Can Traverse Trench</Badge>}
                        {hasPlayedRole('scoring') && <Badge bg="warning">Scoring</Badge>}
                        {hasPlayedRole('passing') && <Badge bg="warning">Passing</Badge>}
                        {hasPlayedRole('defense') && <Badge bg="warning">Defense</Badge>}
                    </Stack>

                    <Button 
                        variant="outline-primary"
                        onClick={() => handleProfileNavigation(robot.profile.teamNumber)}
                        className="statglimpsev2-button"
                    >   
                        View Profile
                    </Button>
                </div>
                <Card.Img
                    variant="bottom"
                    src={
                        robot.profile?.robotImages[0] 
                        ? `${img}${robot.profile.robotImages[0]}`
                        : fillerImg
                    }
                    alt="Robot Image"
                    className="statglimpsev2-image"
                />
            </Card>
        </>
    )
}