import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Feedback from './components/Feedback'
import Workouts from './components/Workouts'
import Plans from './components/Plans'
import Trainers from './components/Trainers'
import Auth from './components/Auth'
import Profile from './components/Profile'
import './components/PageStyles.css'
import RequireAuth from './components/RequireAuth'

// Layout component that always renders the Navbar
const Layout = ({ isLoggedIn, setIsLoggedIn, children }) => {
  return (
    <div className="app-container">
      {/* Always show navbar on all pages */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="content-container">
        {/* Removed footer from all pages */}
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
          <Route path="/login" element={<Auth />} />
          <Route path="/signup" element={<Auth />} />
          {/* Protected routes */}
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/workouts" element={<RequireAuth><Workouts /></RequireAuth>} />
          <Route path="/plans" element={<RequireAuth><Plans /></RequireAuth>} />
          <Route path="/trainers" element={<RequireAuth><Trainers /></RequireAuth>} />
          <Route path="/feedback" element={<RequireAuth><Feedback /></RequireAuth>} />
          <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
          {/* Catch-all */}
          <Route path="*" element={<RequireAuth><Home /></RequireAuth>} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
