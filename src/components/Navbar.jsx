import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get user data from localStorage
  useEffect(() => {
    if (isLoggedIn) {
      const user = localStorage.getItem('user');
      if (user) {
        setUserData(JSON.parse(user));
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowUserMenu(false);
    
    // Dispatch custom event to notify about authentication change
    window.dispatchEvent(new Event('auth-change'));
    
    navigate('/');
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo & Brand Name */}
          <div>
            <Link to="/" className="brand-name">
              Fitness App
            </Link>
          </div>
          
          {/* Desktop Menu Items */}
          <div className="desktop-menu">
            <div className="menu-items">
              <Link to="/workouts" className={`menu-link ${location.pathname === '/workouts' ? 'active' : ''}`}>
                <span>My Workouts</span>
                <span className="menu-link-underline"></span>
              </Link>
              <Link to="/plans" className={`menu-link ${location.pathname === '/plans' ? 'active' : ''}`}>
                <span>Plans</span>
                <span className="menu-link-underline"></span>
              </Link>
              <Link to="/trainers" className={`menu-link ${location.pathname === '/trainers' ? 'active' : ''}`}>
                <span>Trainers</span>
                <span className="menu-link-underline"></span>
              </Link>
              <Link to="/feedback" className={`menu-link ${location.pathname === '/feedback' ? 'active' : ''}`}>
                <span>Feedback</span>
                <span className="menu-link-underline"></span>
              </Link>
            </div>
          </div>
          
          {/* Auth Buttons or User Profile */}
          <div className="buttons-container">
            {isLoggedIn && userData ? (
              <div className="user-profile-menu">
                <button 
                  onClick={toggleUserMenu}
                  className="user-profile-button"
                >
                  <div className="user-avatar">
                    {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="user-name">{userData.name}</span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor" 
                    className={`user-menu-arrow ${showUserMenu ? 'rotate' : ''}`}
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      className="user-dropdown-menu"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to="/profile" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      <Link to="/workouts" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        My Workouts
                      </Link>
                      <button className="dropdown-item logout" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link to="/login">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="login-button"
                  >
                    Log In
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="signup-button"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-button"
          >
            <svg 
              className={`h-6 w-6 ${isMenuOpen ? 'hidden' : 'block'}`}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              className={`h-6 w-6 ${isMenuOpen ? 'block' : 'hidden'}`}
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mobile-menu"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="mobile-menu-items"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="mobile-link-container"
              >
                <Link 
                  to="/workouts" 
                  className={`mobile-link ${location.pathname === '/workouts' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Workouts
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="mobile-link-container"
              >
                <Link 
                  to="/plans" 
                  className={`mobile-link ${location.pathname === '/plans' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Plans
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mobile-link-container"
              >
                <Link 
                  to="/trainers" 
                  className={`mobile-link ${location.pathname === '/trainers' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Trainers
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="mobile-link-container"
              >
                <Link 
                  to="/feedback" 
                  className={`mobile-link ${location.pathname === '/feedback' ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Feedback
                </Link>
              </motion.div>
              
              {/* Mobile Auth Buttons */}
              <div className="mobile-buttons">
                {isLoggedIn && userData ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mobile-user-info"
                    >
                      <div className="mobile-avatar">
                        {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span>{userData.name}</span>
                    </motion.div>
                    
                    <motion.button 
                      className="mobile-logout-button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                    >
                      Log Out
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button 
                      className="mobile-login-button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/login');
                        setIsMenuOpen(false);
                      }}
                    >
                      Log In
                    </motion.button>
                    
                    <motion.button 
                      className="mobile-signup-button"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        navigate('/signup');
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Up
                    </motion.button>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
