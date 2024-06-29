import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import useLogout from '../hooks/useLogout';
import { Link, useNavigate } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay-ts';

function Header() {
  const logout = useLogout();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };

  const handleNavigation = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
      setIsLoading(false);
    }, 500); // Delay to show loading overlay
  };

  return (
    <header>
      <LoadingOverlay active={isLoading} spinner text='Loading your content...'>
        <div className='header'>
          <div className="nav">
            <div className="nav-box">
              <Link to="/home" onClick={(e) => { e.preventDefault(); handleNavigation('/home'); }}>Home</Link>
            </div>
            <div className="nav-box">
              <Link to="/upload" onClick={(e) => { e.preventDefault(); handleNavigation('/upload'); }}>Upload</Link>
            </div>
          </div>
          <Button variant='danger' onClick={handleLogout}>Logout</Button>
        </div>
      </LoadingOverlay>
    </header>
  );
}

export default Header;
