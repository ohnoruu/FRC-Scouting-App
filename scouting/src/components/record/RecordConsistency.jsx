import React from 'react';
import { Form } from 'react-bootstrap';
import './RecordConsistency.css'

// 0 = none, 1 = inconsistent, 2 = consistent
export default function RecordConsistency({ description, value, onChange }) {
    return (
        <div className="recordConsistency_container">
            <p>{description}</p>
            <Form>
                <Form.Check
                    inline
                    label="None"
                    type="checkbox"
                    checked={value === 0}
                    onChange={() => onChange(0)}
                    className="form-check-white"
                />
                <Form.Check
                    inline
                    label="Inconsistent"
                    type="checkbox"
                    checked={value === 1}
                    onChange={() => onChange(1)}
                    className="form-check-white"
                />
                <Form.Check
                    inline
                    label="Consistent"
                    type="checkbox"
                    checked={value === 2}
                    onChange={() => onChange(2)}
                    className="form-check-white"
                />
            </Form>
        </div>
    );
}
