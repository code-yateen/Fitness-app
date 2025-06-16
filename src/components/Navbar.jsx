import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from './ClerkNavAuth';

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

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo & Brand Name with animation */}
          <motion.div
            className="brand-anim-wrapper"
            initial={false}
            animate={isAuthPage ? { justifyContent: 'center' } : { justifyContent: 'flex-start' }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            style={{ display: 'flex', flex: 1 }}
          >
            <motion.div
              initial={false}
              animate={isAuthPage ? { x: 0 } : { x: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="brand-name-anim"
              style={{ width: '100%' }}
            >
              <Link to="/" className="brand-name" style={{ width: '100%', textAlign: isAuthPage ? 'center' : 'left' }}>
                Fitness App
              </Link>
            </motion.div>
          </motion.div>
          {/* Only show nav/menu/auth if not on auth page */}
          {!isAuthPage && (
            <>
              {/* Desktop Menu Items */}
              <div className="desktop-menu">
                <div className="menu-items">
                  <SignedIn>
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
                    <Link to="/feedback" className={`menu-link ${location.pathname === '/feedback' ? 'active' : ''}`} style={{ marginRight: '32px' }}>
                      <span>Feedback</span>
                      <span className="menu-link-underline"></span>
                    </Link>
                  </SignedIn>
                </div>
              </div>
              
              {/* Auth Buttons or User Profile */}
              <div className="buttons-container">
                {/* Clerk authentication only on Navbar, not on pages */}
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="clerk-signin-btn">Sign In</button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="clerk-signup-btn">Sign Up</button>
                  </SignUpButton>
                </SignedOut>
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
            </>
          )}
        </div>
      </div>
      {/* Only show mobile menu if not on auth page */}
      {!isAuthPage && (
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
                <SignedIn>
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
                    style={{ marginBottom: '16px' }}
                  >
                    <Link 
                      to="/feedback" 
                      className={`mobile-link ${location.pathname === '/feedback' ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Feedback
                    </Link>
                  </motion.div>
                </SignedIn>
                
                {/* Mobile Auth Buttons */}
                <div className="mobile-buttons">
                  {/* Clerk authentication only on Navbar, not on pages */}
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="clerk-signin-btn">Sign In</button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="clerk-signup-btn">Sign Up</button>
                    </SignUpButton>
                  </SignedOut>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </motion.nav>
  );
};

export default Navbar;
