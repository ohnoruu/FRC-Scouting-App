import { useEffect, useState } from 'react';
import { Form, Image, Button } from 'react-bootstrap';

import './MultiImageUpload.css';

export default function MultiImageUpload({ images, onChange, isEditing = false}) {
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        const newPreviews = images.map((img) => {
            // if val is string URL, return it directly
            if (typeof img === 'string'){
                return img;
            }
            return URL.createObjectURL(img); //create temp URL for file otherwise
        });

        if (!isEditing) {
            setPreviews(newPreviews);
        }

        return () => { // Cleanup function to revoke object URLs
            newPreviews.forEach((p) => {
                if (p.startsWith('blob:')) { // check if object URL
                    URL.revokeObjectURL(p); 
                };
            });
        };
    }, [images])

    const addImage = (file) => {
        if (!file) return; // Exit for null/undefined file
        onChange([...images, file]); // Append new file to images array
    };

    const removeImage = (index) => {
        const image = images[index];

        if (isEditing && typeof image === 'string'){
            return; // Prevent removal of existing images in editing mode
        }

        onChange(images.filter((_, i) => i !== index)); // Remove image at index
    }

    return (
        <>
            <Form.Group>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        addImage(e.target.files[0]);
                        e.target.value = null; // Reset input value to allow re-uploading same file
                    }}
                />
            </Form.Group>

            <div className="multiImageUpload-imageGrid">
                {previews.map((src, index) => {
                    const isExisting = typeof images[index] === 'string';

                    return (
                        <div className="multiImageUpload-imageItem" key={index}>
                            <Image
                                src={src}
                                fluid
                                rounded
                                className="multiImageUpload-image"
                            />

                            {(!isExisting || !isEditing) && (
                                <Button 
                                    variant="danger" 
                                    size="sm" 
                                    onClick={()=>removeImage(index)}
                                    className="multiImageUpload-removeButton"
                                >
                                    x
                                </Button>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    )


}