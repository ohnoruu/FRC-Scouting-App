import React from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import './MultiCounter.css';

export default function MultiCounter({title, target, setTarget}) {
    return (
        <div className="multiCounter-container">
            <p>{title}</p>
            <div className="multiCounter-row">
                <ButtonGroup>
                    <Button variant="primary" onClick={() => setTarget(prev => Math.max(0, prev - 1))} className="multiCounter-button">
                        -1
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => Math.max(0, prev - 2))} className="multiCounter-button">
                        -2
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => Math.max(0, prev - 5))} className="multiCounter-button">
                        -5
                    </Button>
                </ButtonGroup>
                <Form>
                    <Form.Control
                        type="number"
                        value={target.toString()}
                        onChange={(e) => setTarget(Number(e.target.value))}
                        className="multiCounter-input"
                    />
                </Form>
                <ButtonGroup>
                    <Button variant="primary" onClick={() => setTarget(prev => prev + 1)} className="multiCounter-button">
                        +1
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => prev + 2)} className="multiCounter-button">
                        +2
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => prev + 5)} className="multiCounter-button">
                        +5
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}