import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Feedback from './components/Feedback'
import Workouts from './components/Workouts'
import Plans from './components/Plans'
import Trainers from './components/Trainers'
import './components/PageStyles.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
