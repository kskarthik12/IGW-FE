import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom'
import toast from 'react-hot-toast';
import assets2 from '../assets/signup.jpg'
import AxiosService from '../utils/AxiosService';
import ApiRoutes from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom';
import { ProgressBar } from 'react-loader-spinner';




function SignUp() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
 

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      let formData = new FormData(e.target);
      let data = Object.fromEntries(formData);
  
      if (data.email && data.password && data.username) {
        let res = await AxiosService.post(ApiRoutes.SIGNUP.path, data, {
          authenticate: ApiRoutes.SIGNUP.authenticate,
        });
  
       
  
        if (res.status === 201) {
          toast.success(res.data.message);
          navigate('/login');
        }
      } else {
        toast.error("Please input Email ID, Password, Username");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return <>

  <img src={assets2} alt="Asset"></img>

  <div className='loginWrapper'>
    <div className='loginHeader'>
      <h2>SignUp</h2>
      <p>Already Have an account? <Link to='/login'>Login</Link></p>
    </div>
  <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3" >
        <Form.Label>Email ID</Form.Label>
        <Form.Control type="email" placeholder="Enter Email Id" name='email'/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" name='username'/>
      </Form.Group>

  

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password'/>
      </Form.Group>
      
      <Button className='button' variant="primary" type="submit" disabled={isLoading}>
        {isLoading ? 'Registering' :'SignUp'}
      </Button>
    </Form>

    {isLoading && (
          <div className="loading-container">
            <ProgressBar
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="progress-bar-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
  </div>
  </>
}

export default SignUp