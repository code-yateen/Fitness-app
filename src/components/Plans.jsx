import React from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Beginner Boost',
    level: 'Beginner',
    icon: '🏁',
    description: 'Kickstart your fitness journey with easy-to-follow routines and basic nutrition guidance.',
    features: [
      '3 workouts/week',
      'Full-body routines',
      'Simple meal plans',
      'Progress tracking',
    ],
    cta: 'Start Beginner Plan',
  },
  {
    name: 'Intermediate Ignite',
    level: 'Intermediate',
    icon: '🔥',
    description: 'Take your training to the next level with split routines and advanced nutrition tips.',
    features: [
      '5 workouts/week',
      'Upper/lower splits',
      'Macro-based meal plans',
      'Community challenges',
    ],
    cta: 'Start Intermediate Plan',
  },
  {
    name: 'Advanced Elite',
    level: 'Advanced',
    icon: '🏆',
    description: 'Push your limits with intense training, performance tracking, and expert support.',
    features: [
      '6+ workouts/week',
      'Targeted muscle groups',
      'Performance analytics',
      '1-on-1 trainer support',
    ],
    cta: 'Start Advanced Plan',
  },
];

const Plans = () => {
  return (
    <motion.div 
      className="plans-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="page-title">Choose Your Fitness Plan</h1>
      <p className="page-description">
        Select a plan that matches your fitness level and goals. Each plan is crafted by experts and powered by our smart AI.
      </p>
      <div className="plans-grid">
        {plans.map((plan, idx) => (
          <motion.div 
            className="plan-card-glass" 
            key={plan.name}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(76,29,149,0.18)' }}
            transition={{ duration: 0.2 }}
          >
            <div className="plan-icon">{plan.icon}</div>
            <h2 className="plan-name">{plan.name}</h2>
            <span className={`plan-level plan-level-${plan.level.toLowerCase()}`}>{plan.level}</span>
            <p className="plan-desc">{plan.description}</p>
            <ul className="plan-features">
              {plan.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <button className="plan-cta">{plan.cta}</button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Plans;
