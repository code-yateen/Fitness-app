import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const RequireAuth = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith('/sign-in') || location.pathname.startsWith('/sign-up');

  if (!isLoaded) return null;
  if (!isSignedIn && !isAuthPage) {
    // Redirect to Clerk's sign-in page, but avoid redirect loop
    return <Navigate to={`/sign-in?redirect_url=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return children;
};

export default RequireAuth;
