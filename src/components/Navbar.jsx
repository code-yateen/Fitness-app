import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
  return (    <motion.nav 
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo & Brand Name */}
          <div>
            <span className="brand-name">
              Fitness App
            </span>
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
            </div>          </div>
          {/* Login/Signup Combined Button */}
          <div className="buttons-container">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="login-signup-button"
            >
              <span className="login-button-text">Login/Signup</span>
              <span className="login-button-overlay"></span>
            </motion.button>
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
        </div>      </div>
        {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mobile-menu"
          style={{ display: 'block', width: '100%' }}
        >
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, staggerChildren: 0.1 }}
            className="mobile-menu-items">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mobile-link-container"
            >              <Link 
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
            </motion.div><div className="mobile-buttons">
              <motion.button 
                className="mobile-login-signup-button"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                whileTap={{ scale: 0.95 }}
              >
                Login/Signup
              </motion.button>
            </div>
          </motion.div>
        </motion.div>      )}
    </motion.nav>
  );
};

export default Navbar;
