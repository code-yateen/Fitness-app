import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Feedback from './components/Feedback'
import Workouts from './components/Workouts'
import Plans from './components/Plans'
import Trainers from './components/Trainers'
import Auth from './components/Auth'
import ProtectedRoute from './components/ProtectedRoute'
import './components/PageStyles.css'

// Layout component that always renders the Navbar
const Layout = ({ isLoggedIn, setIsLoggedIn, children }) => {
  return (
    <div className="app-container">
      {/* Always show navbar on all pages */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="content-container">
        {children}
      </div>
    </div>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in on component mount and when localStorage changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn');
      setIsLoggedIn(loggedIn === 'true');
    };

    // Check initially
    checkLoginStatus();

    // Add event listener for storage changes (for multi-tab support)
    window.addEventListener('storage', checkLoginStatus);
    
    // Custom event for logging in/out within the same tab
    window.addEventListener('auth-change', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
      window.removeEventListener('auth-change', checkLoginStatus);
    };
  }, []);

  return (
    <Router>
      <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Protected route for My Workouts - users must be logged in */}
          <Route path="/workouts" element={
            <ProtectedRoute>
              <Workouts />
            </ProtectedRoute>
          } />
          <Route path="/plans" element={<Plans />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
