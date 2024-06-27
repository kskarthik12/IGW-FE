const ApiRoutes = {
    LOGIN:{
        path:'/user/login',
        authenticate:false
    },
    SIGNUP:{
        path:'/user/signup',
        authenticate:false
    },
    IMAGE:{
        path:'/user/image',
        authenticate:true
    },
    UPLOAD:{
        path:'/user/image-upload',
        authenticate:true
    }
    
}

export default ApiRoutes