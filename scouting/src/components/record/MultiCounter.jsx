import React from 'react';
import { ButtonGroup, Button, Form } from 'react-bootstrap';
import './MultiCounter.css';

export default function MultiCounter({title, target, setTarget}) {
    const amounts = [2,5,10];

    return (
        <div className="multiCounter-container">
            <Form.Range/>
            <p>{title}</p>
            <div className="multiCounter-row">
                <ButtonGroup>
                    <Button variant="primary" onClick={() => setTarget(prev => Math.max(0, prev - amounts[2]))} className="multiCounter-button">
                        -{amounts[2]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => Math.max(0, prev - amounts[1]))} className="multiCounter-button">
                        -{amounts[1]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => Math.max(0, prev - amounts[0]))} className="multiCounter-button">
                        -{amounts[0]}
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
                    <Button variant="primary" onClick={() => setTarget(prev => prev + amounts[0])} className="multiCounter-button">
                        +{amounts[0]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => prev + amounts[1])} className="multiCounter-button">
                        +{amounts[1]}
                    </Button>
                    <Button variant="primary" onClick={() => setTarget(prev => prev + amounts[2])} className="multiCounter-button">
                        +{amounts[2]}
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    )
}