import { useState, useEffect } from 'react';
import { Form, Image, Button } from 'react-bootstrap';

export default function ImageUpload({ value, onChange }) {
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!value) { // If no value is provided, clear the preview
            setPreview(null);
            return;
        }

        if (typeof value === 'string') { // If the value is a string (URL), use it directly
            setPreview(value);
        } else {
            const objectUrl = URL.createObjectURL(value); // Create a temporary URL for the file
            setPreview(objectUrl); // Set the preview to the object URL

            return () => URL.revokeObjectURL(objectUrl); // Clean up the object URL when the component unmounts or value changes
        }
    }, [value]);

    const handleRemove = () => {
        onChange(null);
    }

    return (
        <>
            {!preview && (
                <Form.Group>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => onChange(e.target.files[0])}
                    />
                </Form.Group>
            )}

            {preview && (
                <div style={{ textAlign: 'center'}}>
                    <Image
                        src={preview}
                        alt="Robot Preview"
                        fluid
                        rounded
                        style={{ maxHeight: '300px', marginBottom: '1rem' }}
                    />

                    <div>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={handleRemove}
                        >
                            Remove Image
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}