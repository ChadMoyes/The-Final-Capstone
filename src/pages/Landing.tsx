import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import "../Landing.css"
import "../config/routes"

// The heart and soul - the first thing a new user sees should be soothing and inviting!
const LandingPage = () => {
  const [showText, setShowText] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // The text array allows words to rotate in and after a certain amount of time leave
  const textArray = [
    'Welcome to the Oasis!',
    'Be inspired.',
    'All about Me.',
    'Sign in to continue!',
    'All your Data in one place'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
    }, 3000); // Changes the text every 3 seconds
    return () => clearInterval(timer);
  }, [textArray]);

  useEffect(() => {
    setShowText(true);
    setTimeout(() => {
      setShowText(false);
    }, 2800); // Waits for the animation to finish before hiding the text
  }, [currentTextIndex]);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className={`landing-text ${showText ? 'show' : 'hide'}`}>
          {textArray[currentTextIndex]}
        </h1>
      </div>
      <div className="landing-button">
        <Link to="/signIn">
          <button className="sign-in-btn">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage