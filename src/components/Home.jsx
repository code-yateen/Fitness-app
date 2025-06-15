import React from 'react';

const Home = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">
        <span className="hero-title-block">Transform Your Body</span>
        <span className="hero-title-gradient">
          Transform Your Life
        </span>
      </h1>
      <p className="hero-description">
        Get personalized workout plans, expert trainers, and a supportive community to help you achieve your fitness goals.
      </p>
      <div className="button-container">
        <button className="primary-button">
          Get Started
        </button>
        <button className="secondary-button">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Home;
