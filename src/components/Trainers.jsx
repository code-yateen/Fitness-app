import React from 'react';
import { motion } from 'framer-motion';

const trainers = [
  {
    name: 'Sakshi Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    specialty: 'Strength & Conditioning',
    bio: 'Certified trainer with 7+ years of experience helping clients build strength and confidence.',
    socials: {
      instagram: 'https://instagram.com/',
      email: 'mailto:sakshi@example.com',
    },
  },
  {
    name: 'Rahul Mehra',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    specialty: 'HIIT & Cardio',
    bio: 'Passionate about high-intensity training and making fitness fun and accessible for everyone.',
    socials: {
      instagram: 'https://instagram.com/',
      email: 'mailto:rahul@example.com',
    },
  },
  {
    name: 'Priya Verma',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    specialty: 'Yoga & Flexibility',
    bio: 'Yoga instructor focused on holistic wellness, flexibility, and mindfulness.',
    socials: {
      instagram: 'https://instagram.com/',
      email: 'mailto:priya@example.com',
    },
  },
];

const Trainers = () => {
  return (
    <motion.div 
      className="trainers-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="page-title">Meet Our Trainers</h1>
      <p className="page-description">
        Our certified trainers are here to motivate, guide, and support you every step of the way.
      </p>
      <div className="trainers-grid">
        {trainers.map((trainer, idx) => (
          <motion.div 
            className="trainer-card-glass" 
            key={trainer.name}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(76,29,149,0.18)' }}
            transition={{ duration: 0.2 }}
          >
            <img src={trainer.avatar} alt={trainer.name} className="trainer-avatar" />
            <h2 className="trainer-name">{trainer.name}</h2>
            <span className="trainer-specialty">{trainer.specialty}</span>
            <p className="trainer-bio">{trainer.bio}</p>
            <div className="trainer-socials">
              <a href={trainer.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5a5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5zm5.13.88a1 1 0 1 1-2 0a1 1 0 0 1 2 0z"/></svg>
              </a>
              <a href={trainer.socials.email} aria-label="Email">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 19.5 19.5h-15A2.25 2.25 0 0 1 2.25 17.25zm1.5 0v.638l8.25 6.187l8.25-6.187V6.75a.75.75 0 0 0-.75-.75h-15a.75.75 0 0 0-.75.75zm17.25 1.987l-7.7 5.78a1.25 1.25 0 0 1-1.55 0l-7.7-5.78V17.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75z"/></svg>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Trainers;
