import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// This component checks if the user is logged in
// If they are, it renders the children components
// If not, it redirects to the login page, saving the original URL they were trying to access
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // If not logged in, redirect to login page with a redirect parameter
  if (!isLoggedIn) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // If logged in, render the children components
  return children;
};

export default ProtectedRoute;
