import React from 'react';
import { motion } from 'framer-motion';

const Workouts = () => {
  return (
    <motion.div 
      className="workouts-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="page-title">My Workouts</h1>
      <p className="page-description">
        Your personalized workout plans and progress tracking will appear here.
      </p>
      
      <div className="placeholder-content">
        <div className="info-box">
          <h3>Coming Soon</h3>
          <p>We're currently working on building your personalized workout experience.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Workouts;
