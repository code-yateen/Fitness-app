import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
    // State to toggle between login and signup forms
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  
  // Get redirect URL from query params (if it exists)
  const [redirectPath, setRedirectPath] = useState('/');
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);
  
  useEffect(() => {
    // Update isLogin state when route changes
    setIsLogin(location.pathname === '/login');
    
    // Parse the URL search parameters to get the redirect path
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get('redirect');
    
    if (redirect) {
      setRedirectPath(redirect);
      
      // Show message if redirected from a protected route
      if (redirect === '/workouts') {
        setShowRedirectMessage(true);
      }
    } else {
      setRedirectPath('/');
      setShowRedirectMessage(false);
    }
  }, [location.pathname, location.search]);
  
  // State for form inputs
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  
  // State for error messages
  const [errors, setErrors] = useState({});
  
  // Toggle between login and signup
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };
  
  // Handle login form inputs
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Handle signup form inputs
  const handleSignupChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSignupData({
      ...signupData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  // Validate login form
  const validateLoginForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!loginData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!loginData.password) {
      newErrors.password = 'Password is required';
    } else if (loginData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Validate signup form
  const validateSignupForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!signupData.name) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!signupData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!signupData.password) {
      newErrors.password = 'Password is required';
    } else if (signupData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement
    if (!signupData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
    // Handle login submission
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    if (validateLoginForm()) {
      // In a real app, this would call an API to authenticate
      console.log('Login submitted:', loginData);
        // Mock successful login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({
        email: loginData.email,
        name: loginData.email.split('@')[0] // Use part of the email as the name for demo
      }));
      
      // Dispatch custom event to notify about authentication change
      window.dispatchEvent(new Event('auth-change'));
      
      // Redirect to the saved path or home page after successful login
      navigate(redirectPath);
    }
  };
  
  // Handle signup submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    
    if (validateSignupForm()) {
      // In a real app, this would call an API to register the user
      console.log('Signup submitted:', signupData);
        // Mock successful registration and login
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify({
        email: signupData.email,
        name: signupData.name
      }));
      
      // Dispatch custom event to notify about authentication change
      window.dispatchEvent(new Event('auth-change'));
      
      // Redirect to the saved path or home page after successful signup
      navigate(redirectPath);
    }
  };
  
  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  
  const inputVariants = {
    focus: { scale: 1.02, boxShadow: "0 0 10px rgba(99, 102, 241, 0.5)" },
    blur: { scale: 1, boxShadow: "none" }
  };
    return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          <motion.div 
            className="auth-form-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >            <div className="auth-header">
              <h1 className="auth-title">
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className="auth-subtitle">
                {isLogin 
                  ? 'Log in to access your fitness journey' 
                  : 'Start your fitness journey with us today'}
              </p>
              
              {showRedirectMessage && (
                <motion.div 
                  className="redirect-message"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>You need to log in to access My Workouts</span>
                </motion.div>
              )}
            </div>
            
            {/* Login Form */}
            {isLogin && (
              <motion.form 
                className="auth-form" 
                onSubmit={handleLoginSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                key="login-form"
              >
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <motion.input 
                    type="email" 
                    id="login-email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    placeholder="your@email.com"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <div className="password-label-group">
                    <label htmlFor="login-password">Password</label>
                    <a href="#" className="forgot-password">Forgot password?</a>
                  </div>
                  <motion.input 
                    type="password" 
                    id="login-password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    placeholder="••••••••"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                
                <button type="submit" className="auth-button">
                  Log In
                </button>
                
                <div className="auth-divider">
                  <span>OR</span>
                </div>
                
                <button type="button" className="social-auth-button google">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.35,11.1H12v3.8h5.3c-0.26,1.2-1.2,2.6-2.6,3.4c-1.6,0.8-3.6,1-5.2,0.4c-2.4-1-3.9-3.2-4-5.8c0-2.6,1.5-4.9,3.9-5.9
                    c1.3-0.6,2.8-0.6,4.1,0l2.9-2.9C14.2,1.8,10.5,1.3,7.5,2.8c-4.3,2.2-6.8,7-5.9,11.6c0.7,4.2,4.1,7.6,8.3,8.2c3.3,0.4,6.5-0.6,8.8-2.9
                    c2.2-2.2,2.9-5.3,2.9-7.9C21.6,11.7,21.5,11.4,21.35,11.1z"/>
                  </svg>
                  Continue with Google
                </button>
              </motion.form>
            )}
            
            {/* Signup Form */}
            {!isLogin && (
              <motion.form 
                className="auth-form" 
                onSubmit={handleSignupSubmit}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                key="signup-form"
              >
                <div className="form-group">
                  <label htmlFor="signup-name">Full Name</label>
                  <motion.input 
                    type="text" 
                    id="signup-name"
                    name="name"
                    value={signupData.name}
                    onChange={handleSignupChange}
                    placeholder="John Doe"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="signup-email">Email</label>
                  <motion.input 
                    type="email" 
                    id="signup-email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    placeholder="your@email.com"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="signup-password">Password</label>
                  <motion.input 
                    type="password" 
                    id="signup-password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder="••••••••"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="signup-confirm-password">Confirm Password</label>
                  <motion.input 
                    type="password" 
                    id="signup-confirm-password"
                    name="confirmPassword"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder="••••••••"
                    variants={inputVariants}
                    whileFocus="focus"
                    whileBlur="blur"
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
                
                <div className="form-group checkbox-group">
                  <div className="checkbox-wrapper">
                    <input 
                      type="checkbox" 
                      id="terms"
                      name="agreeToTerms"
                      checked={signupData.agreeToTerms}
                      onChange={handleSignupChange}
                    />
                    <label htmlFor="terms">
                      I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                </div>
                
                <button type="submit" className="auth-button">
                  Create Account
                </button>
                
                <div className="auth-divider">
                  <span>OR</span>
                </div>
                
                <button type="button" className="social-auth-button google">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.35,11.1H12v3.8h5.3c-0.26,1.2-1.2,2.6-2.6,3.4c-1.6,0.8-3.6,1-5.2,0.4c-2.4-1-3.9-3.2-4-5.8c0-2.6,1.5-4.9,3.9-5.9
                    c1.3-0.6,2.8-0.6,4.1,0l2.9-2.9C14.2,1.8,10.5,1.3,7.5,2.8c-4.3,2.2-6.8,7-5.9,11.6c0.7,4.2,4.1,7.6,8.3,8.2c3.3,0.4,6.5-0.6,8.8-2.9
                    c2.2-2.2,2.9-5.3,2.9-7.9C21.6,11.7,21.5,11.4,21.35,11.1z"/>
                  </svg>
                  Sign up with Google
                </button>
              </motion.form>
            )}
            
            <div className="auth-toggle">
              {isLogin ? (
                <p>Don't have an account? <button type="button" onClick={toggleForm}>Sign up</button></p>
              ) : (
                <p>Already have an account? <button type="button" onClick={toggleForm}>Log in</button></p>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            className="auth-image"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="auth-image-overlay">
              <h2>{isLogin ? "Welcome Back!" : "Join Our Community"}</h2>
              <p>
                {isLogin 
                  ? "Track your progress, access personalized workout plans, and reach your fitness goals faster." 
                  : "Create your account to get personalized workout and diet plans tailored to your goals."}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
