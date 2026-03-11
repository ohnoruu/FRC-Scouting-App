import { useEffect, useState } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
import heic2any from "heic2any";

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

    const addImage = async (file) => {
        if (!file) return;

        let processedFile = file;

        // Detect HEIC images from iPhones
        if (file.type === "image/heic" || file.type === "image/heif") {
            try {
                const convertedBlob = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.9
                });

                processedFile = new File(
                    [convertedBlob],
                    file.name.replace(/\.heic/i, ".jpg"),
                    { type: "image/jpeg" }
                );
            } catch (err) {
                console.error("HEIC conversion failed:", err);
                return;
            }
        }

        onChange([...images, processedFile]);
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
                        const file = e.target.files?.[0];
                        if (file) addImage(file);
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