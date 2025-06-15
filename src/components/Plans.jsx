import React from 'react';
import { motion } from 'framer-motion';

const Plans = () => {
  return (
    <motion.div 
      className="plans-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="page-title">Fitness Plans</h1>
      <p className="page-description">
        Discover customized fitness plans designed to help you reach your goals.
      </p>
      
      <div className="placeholder-content">
        <div className="info-box">
          <h3>Coming Soon</h3>
          <p>Our team is developing a variety of fitness plans tailored to different goals and fitness levels.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default Plans;
