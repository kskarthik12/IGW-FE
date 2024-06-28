import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import Home from '../components/Home'
import { Navigate } from 'react-router-dom'
import ImageUpload from '../components/ImageUpload'
import UserGuard from './UserGuard'

const AppRoutes=[
  {
      path:'/login',
      element:<Login/>
  },
  {
      path:'/signup',
      element:<SignUp/>
  },
 
  {
      path:"/home",
      element: <UserGuard> <Home/> </UserGuard>
  },
  
  {
    path:"/upload",
    element: <UserGuard> <ImageUpload/> </UserGuard>
},


  {
      path:'*',
      element:<Navigate to='/login'/>
  } 
]

export default AppRoutes