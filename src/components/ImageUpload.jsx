import React, { useState } from 'react';
import AxiosService  from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import upload from '../assets/upload.jpg';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate()


    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        
        let design_code = document.getElementById('design_code').value;
        let text = document.getElementById('text').value;
        let label = document.getElementById('label').value;
    
        // Split the design_code, text, and label by comma and trim each element
        let design_code_array = design_code.split(',').map(code => code.trim());
        let text_array = text.split(',').map(item => item.trim());
        let label_array = label.split(',').map(item => item.trim());
    
        // Convert the arrays to strings formatted like arrays
        design_code = `['${design_code_array.join("','")}']`;
        text = `['${text_array.join("','")}']`;
        label = `['${label_array.join("','")}']`; 


        const formData = {
            serial_number: document.getElementById('serial_number').value,
            design_code: design_code,
            text: text,
            label: label
        };

        if (selectedFile) {
            // Convert file to base64 string
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onloadend = () => {
                formData.image = reader.result.split(',')[1]; // Get base64 string without data URL part

                // Send data as JSON
                sendFormData(formData);
            };
        } else {
            toast.error('Please select an image file');
        }
    };

    const sendFormData = async (formData) => {
        try {
            const res = await AxiosService.post(ApiRoutes.UPLOAD.path, formData, {
                authenticate:ApiRoutes.UPLOAD.authenticate
            });

            if (res.status === 201) {

                toast.success('Image uploaded successfully');
                navigate('/home')
            }else{
                toast.error('Image upload failed');
            }
            
        } catch (error) {
            toast.error(error.response.data?.message || 'An unexpected error occurred');
        }
        
    };

    return (
        <>
        
            <Header />
            <img src={upload} alt="upload"></img>
            <div className='loginWrapper'>
                <div className='loginHeader'>
                    <h2>Upload Images</h2>
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Serial Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter your Serial Number" id='serial_number' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Design Code</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Design Code" id='design_code' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Text</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Description" id='text' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Label</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Label Name" id='label' />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="file" id='image' onChange={handleFileChange} required />
                    </Form.Group>

                    <Button className='button' variant="primary" type="submit">
                        Upload
                    </Button>
                </Form>
            </div>
            
        </>
    );
};

export default ImageUpload;
