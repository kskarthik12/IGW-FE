import React from 'react'
import AxiosService  from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes';
import Header from './Header';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import upload from '../assets/upload.jpg';

function EditImage() {
  return <>
    <Header />
            <div className='loginWrapper'>
                <div className='loginHeader'>
                    <h2>Upload Images</h2>
                </div>
                <Form >
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
                        <Form.Control type="file" id='image' required />
                    </Form.Group>

                    <Button className='button' variant="primary" type="submit">
                        Upload
                    </Button>
                </Form>
            </div>
            <img src={upload} alt="upload" className='upload'></img>
  </>
}

export default EditImage