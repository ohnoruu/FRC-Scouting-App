import { Card, Badge } from 'react-bootstrap';
import './MatchPreview.css';

export default function MatchPreview({matchData}){
    return(
        <Card className="matchPreview_container">
            <Card.Body>
                <div className="matchPreview_content">
                    <div className="matchPreview_header">
                        <Card.Title>Match {matchData.matchNumber}</Card.Title>
                        <Card.Subtitle>{matchData.matchType}</Card.Subtitle>
                    </div>
                    <Badge bg="primary">Raw Score: {matchData.score}</Badge>
                </div>
            </Card.Body>
        </Card>
    );
}