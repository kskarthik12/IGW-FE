import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AxiosService from '../utils/AxiosService'
import  ApiRoutes from '../utils/ApiRoutes'
import asset from '../assets/login.jpg'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ProgressBar } from 'react-loader-spinner';

function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{ 
    sessionStorage.clear()
  },[])

  const handleLogin = async(e)=>{
    e.preventDefault()
    setIsLoading(true);
    try {
      let formData = new FormData(e.target)
      let data = Object.fromEntries(formData)

      if(data.email && data.password){
        let res = await AxiosService.post(ApiRoutes.LOGIN.path,data,{
          authenticate:ApiRoutes.LOGIN.authenticate
        })
      console.log(res.data)
        if(res.status===200)
        {
          sessionStorage.setItem('token',res.data.token)
          sessionStorage.setItem('username',res.data.user.name)
          sessionStorage.setItem('role',res.data.user.role)
          sessionStorage.setItem('userId',res.data.user.id)
          toast.success(res.data.message) 
          if(res.data.user.role==='user')
            navigate('/home')
        }
        
      }
      else
      {
        toast.error("Input Email and Password")
      }

    } catch (error) {
        toast.error(error.response.data.message || error.message)
    }
    finally {
      setIsLoading(false);
    }
  }

  return <>
    
      <img src={asset} alt="Asset"></img>

      <div className='loginWrapper'>
        <div className='loginHeader'>
          <h2>Login</h2>
          <p>Don't have an account? <Link to='/signup'>SignUp</Link></p>
        </div>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email ID</Form.Label>
            <Form.Control type="email" placeholder="Enter your Email ID" name='email' />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name='password' />
          </Form.Group>
          
 
          <Button className='button' variant="primary" type="submit">
            Login
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

export default Login