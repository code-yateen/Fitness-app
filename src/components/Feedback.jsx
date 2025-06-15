import { useState } from 'react';
import { motion } from 'framer-motion';
import './Feedback.css';

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleRatingChange = (rating) => {
    setFormData(prevData => ({
      ...prevData,
      rating
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          rating: 0
        });
      }, 3000);
    }, 1500);
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <section className="feedback-section" id="feedback">
      <div className="feedback-container">
        <motion.div 
          className="feedback-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2>Your Feedback Matters</h2>
          <p>Help us improve your fitness experience by sharing your thoughts with us.</p>
        </motion.div>
        
        <div className="feedback-content">
          <motion.div 
            className="feedback-benefits"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h3>Enhance Features</h3>
              <p>Your feedback helps us prioritize the features that matter most to you.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3>Improve Experience</h3>
              <p>Help us identify areas where we can make your fitness journey more effective.</p>
            </div>
            
            <div className="benefit-card">
              <div className="benefit-icon">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3>Quick Response</h3>
              <p>We review all feedback regularly and implement changes quickly.</p>
            </div>
          </motion.div>
          
          <motion.form 
            className={`feedback-form ${isSubmitted ? 'submitted' : ''}`}
            onSubmit={handleSubmit}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isSubmitted ? (
              <motion.div 
                className="form-success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="success-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3>Thank You!</h3>
                <p>Your feedback has been submitted successfully.</p>
              </motion.div>
            ) : (
              <>
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label htmlFor="message">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your feedback here..."
                    rows="5"
                    required
                  ></textarea>
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <label>Rate Your Experience</label>
                  <div className="rating-container">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        className={`rating-star ${formData.rating >= star ? 'active' : ''}`}
                        onClick={() => handleRatingChange(star)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div className="form-group" variants={itemVariants}>
                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isSubmitting ? (
                      <div className="spinner"></div>
                    ) : (
                      'Submit Feedback'
                    )}
                  </motion.button>
                </motion.div>
              </>
            )}
          </motion.form>
        </div>
        
        <motion.div 
          className="feedback-testimonials"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <h3>What Others Are Saying</h3>
          <div className="testimonial-cards">
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="star active">★</span>
                ))}
              </div>
              <p>"The trainers are amazing and the workout plans are perfectly tailored to my needs. Great app!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">JD</div>
                <div className="author-info">
                  <h4>John Doe</h4>
                  <span>Member since 2024</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${star <= 4 ? 'active' : ''}`}>★</span>
                ))}
              </div>
              <p>"I've lost 20 pounds in just 3 months. The nutrition guidance combined with workouts is a game changer!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">JS</div>
                <div className="author-info">
                  <h4>Jane Smith</h4>
                  <span>Member since 2023</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`star ${star <= 5 ? 'active' : ''}`}>★</span>
                ))}
              </div>
              <p>"The community support is fantastic. I love connecting with other members who share similar fitness goals."</p>
              <div className="testimonial-author">
                <div className="author-avatar">RJ</div>
                <div className="author-info">
                  <h4>Robert Johnson</h4>
                  <span>Member since 2025</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Feedback;
