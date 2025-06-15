import React from 'react';
import { motion } from 'framer-motion';

const Trainers = () => {
  return (
    <motion.div 
      className="trainers-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="page-title">Our Trainers</h1>
      <p className="page-description">
        Meet our expert trainers who will guide you on your fitness journey.
      </p>
      
      <div className="placeholder-content">
        <div className="info-box">
          <h3>Coming Soon</h3>
          <p>We're assembling a team of certified fitness professionals to provide you with expert guidance.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Trainers;
