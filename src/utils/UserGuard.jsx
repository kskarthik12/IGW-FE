import {Navigate} from 'react-router-dom'
import toast from 'react-hot-toast';

function UserGuard({children}) {
  let role = sessionStorage.getItem('role')
  let token = sessionStorage.getItem('token')

  if (!token || role !== 'user') {
    alert('Only registered users can access this site');
    return <Navigate to='/login' />;
}
return children;
}

export default UserGuard