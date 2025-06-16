import React, { useEffect, useState } from 'react';

const Home = () => {
  // Add animation state for quote
  const [quoteVisible, setQuoteVisible] = useState(false);
  
  // Add animations when component mounts
  useEffect(() => {
    // Animate hero content with a simple fade-in effect
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.style.opacity = '0';
      setTimeout(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
      }, 200);
    }
    
    // Animate hero image with a simple fade-in effect
    const heroImage = document.querySelector('.hero-image-glass');
    if (heroImage) {
      heroImage.style.opacity = '0';
      setTimeout(() => {
        heroImage.style.opacity = '1';
        heroImage.style.transform = 'translateY(0)';
      }, 500);
    }
    
    // Animate quote section
    setTimeout(() => {
      setQuoteVisible(true);
    }, 800);
  }, []);

  return (
    <div className="home-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-title-block">Transform Your Body</span>
            <span className="hero-title-gradient">Transform Your Life</span>
          </h1>
          <p className="hero-description">
            Get personalized workout plans, expert trainers, and a supportive community to help you achieve your fitness goals.
          </p>
          <div className="button-container">
            <a href="/signup" className="primary-button">Get Started</a>
            <a href="/plans" className="secondary-button">Learn More</a>
          </div>
        </div>        <div className="hero-image-glass">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
            alt="Fitness Hero" 
            className="hero-image" 
          />
        </div>
      </section>

      {/* Motivational Quote Section */}
      <section className={`quote-section ${quoteVisible ? 'visible' : ''}`}>
        <div className="quote-container">
          <div className="quote-icon">❝</div>          <blockquote className="quote-text">
            The only bad workout is the one that didn't happen. Fitness is not about being better than someone else, it's about being better than you used to be.
          </blockquote>
          <div className="quote-attribution">- Someone Brave</div>
        </div>
      </section>
    </div>
  );
};

export default Home;
