import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/clerk-react';
import './Workouts.css';

const Workouts = () => {
  const { user } = useUser();
  // States for user profile
  const [profileStep, setProfileStep] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [showDietPlan, setShowDietPlan] = useState(false);
  const [highlightLifestyle, setHighlightLifestyle] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    height: '',
    weight: '',
    fitnessGoal: 'bulk',
    dietPreference: 'nonVegetarian',
    allergies: '',
    lifestyle: 'active',
    budget: 'medium'
  });
  
  // Effect to highlight lifestyle dropdown when reaching step 2
  useEffect(() => {
    if (profileStep === 2) {
      setTimeout(() => setHighlightLifestyle(true), 500);
      setTimeout(() => setHighlightLifestyle(false), 3000);
    }
  }, [profileStep]);

  // If Clerk user is logged in, use their info for the profile
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setProfile((prev) => ({
        ...prev,
        name: user.fullName || user.username || '',
        email: user.primaryEmailAddress?.emailAddress || '',
        // Optionally, set other fields if you store them in Clerk's public metadata
      }));
    }
  }, [user]);

  // Handler for profile inputs
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (profileStep < 3) {
      setProfileStep(profileStep + 1);
    } else {
      setIsLoggedIn(true);
      setShowWorkoutPlan(true);
      // In a real app, you'd save this data to a database
    }
  };

  // Go back one step in the form
  const handleBack = () => {
    if (profileStep > 1) {
      setProfileStep(profileStep - 1);
    }
  };

  // Toggle between workout and diet plan
  const togglePlanView = (plan) => {
    if (plan === 'workout') {
      setShowWorkoutPlan(true);
      setShowDietPlan(false);
    } else {
      setShowWorkoutPlan(false);
      setShowDietPlan(true);
    }
  };

  // Reset and generate a new plan
  const regeneratePlan = () => {
    // This would call your API to get a new plan based on the user's profile
    // For now, we'll just simulate this by toggling the view
    setShowWorkoutPlan(false);
    setTimeout(() => setShowWorkoutPlan(true), 500);
  };

  // Sample workout plans based on fitness goals
  const workoutPlans = {
    bulk: [
      { day: 'Monday', focus: 'Chest & Triceps', exercises: [
        { name: 'Bench Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '60s' }
      ]},
      { day: 'Tuesday', focus: 'Back & Biceps', exercises: [
        { name: 'Pull-ups', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Barbell Rows', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Lat Pulldowns', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: '60s' }
      ]},
      { day: 'Wednesday', focus: 'Rest or Light Cardio', exercises: [
        { name: '30 min Walking/Cycling', sets: 1, reps: '30 min', rest: 'N/A' }
      ]},
      { day: 'Thursday', focus: 'Legs & Core', exercises: [
        { name: 'Squats', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Leg Curls', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Planks', sets: 3, reps: '30-45s', rest: '30s' }
      ]},
      { day: 'Friday', focus: 'Shoulders & Arms', exercises: [
        { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s' },
        { name: 'Lateral Raises', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Face Pulls', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Preacher Curls', sets: 3, reps: '10-12', rest: '60s' }
      ]},
      { day: 'Saturday', focus: 'Full Body', exercises: [
        { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '120s' },
        { name: 'Push-ups', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Dumbbell Rows', sets: 3, reps: '10-12', rest: '60s' },
        { name: 'Lunges', sets: 3, reps: '10-12 each', rest: '60s' },
        { name: 'Russian Twists', sets: 3, reps: '15-20', rest: '30s' }
      ]},
      { day: 'Sunday', focus: 'Rest Day', exercises: [
        { name: 'Complete Rest or Light Walking', sets: 0, reps: 'N/A', rest: 'N/A' }
      ]}
    ],
    cut: [
      { day: 'Monday', focus: 'HIIT & Upper Body', exercises: [
        { name: 'Jumping Jacks', sets: 1, reps: '3 min', rest: '30s' },
        { name: 'Push-ups', sets: 3, reps: '15-20', rest: '30s' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12-15', rest: '30s' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '15s' },
        { name: 'Burpees', sets: 3, reps: '10-12', rest: '45s' }
      ]},
      { day: 'Tuesday', focus: 'Cardio & Core', exercises: [
        { name: 'Running/Cycling', sets: 1, reps: '30 min', rest: 'N/A' },
        { name: 'Plank', sets: 3, reps: '45-60s', rest: '30s' },
        { name: 'Russian Twists', sets: 3, reps: '20 each side', rest: '30s' },
        { name: 'Leg Raises', sets: 3, reps: '15-20', rest: '30s' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s' }
      ]},
      { day: 'Wednesday', focus: 'Lower Body & HIIT', exercises: [
        { name: 'Bodyweight Squats', sets: 3, reps: '20-25', rest: '30s' },
        { name: 'Lunges', sets: 3, reps: '15 each leg', rest: '30s' },
        { name: 'Jump Squats', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Calf Raises', sets: 3, reps: '20-25', rest: '30s' },
        { name: 'Burpees', sets: 3, reps: '10-12', rest: '45s' }
      ]},
      { day: 'Thursday', focus: 'Active Recovery', exercises: [
        { name: 'Brisk Walking', sets: 1, reps: '45 min', rest: 'N/A' },
        { name: 'Light Stretching', sets: 1, reps: '15 min', rest: 'N/A' }
      ]},
      { day: 'Friday', focus: 'Upper Body & Core', exercises: [
        { name: 'Push-ups', sets: 3, reps: '15-20', rest: '30s' },
        { name: 'Dips', sets: 3, reps: '12-15', rest: '30s' },
        { name: 'Pull-ups/Assisted Pull-ups', sets: 3, reps: '8-10', rest: '45s' },
        { name: 'Plank to Push-up', sets: 3, reps: '10-12', rest: '30s' },
        { name: 'Bicycle Crunches', sets: 3, reps: '20 each side', rest: '30s' }
      ]},
      { day: 'Saturday', focus: 'HIIT Circuit', exercises: [
        { name: 'Jump Rope', sets: 3, reps: '1 min', rest: '30s' },
        { name: 'Burpees', sets: 3, reps: '10', rest: '30s' },
        { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '30s' },
        { name: 'High Knees', sets: 3, reps: '30s', rest: '30s' },
        { name: 'Jumping Jacks', sets: 3, reps: '1 min', rest: '30s' }
      ]},
      { day: 'Sunday', focus: 'Rest Day', exercises: [
        { name: 'Complete Rest or Light Walking', sets: 0, reps: 'N/A', rest: 'N/A' }
      ]}
    ],
    maintain: [
      { day: 'Monday', focus: 'Full Body Strength', exercises: [
        { name: 'Squats', sets: 3, reps: '12-15', rest: '60s' },
        { name: 'Push-ups', sets: 3, reps: '10-15', rest: '45s' },
        { name: 'Dumbbell Rows', sets: 3, reps: '12 each arm', rest: '45s' },
        { name: 'Lunges', sets: 3, reps: '10 each leg', rest: '45s' },
        { name: 'Plank', sets: 3, reps: '30-45s', rest: '30s' }
      ]},
      { day: 'Tuesday', focus: 'Cardio & Mobility', exercises: [
        { name: 'Jogging/Brisk Walking', sets: 1, reps: '30 min', rest: 'N/A' },
        { name: 'Dynamic Stretching', sets: 1, reps: '10 min', rest: 'N/A' }
      ]},
      { day: 'Wednesday', focus: 'Functional Training', exercises: [
        { name: 'Kettlebell Swings', sets: 3, reps: '15', rest: '45s' },
        { name: 'Medicine Ball Slams', sets: 3, reps: '12', rest: '45s' },
        { name: 'Box Jumps/Step-ups', sets: 3, reps: '10', rest: '45s' },
        { name: 'Battle Ropes', sets: 3, reps: '30s', rest: '45s' },
        { name: 'Renegade Rows', sets: 3, reps: '8 each side', rest: '45s' }
      ]},
      { day: 'Thursday', focus: 'Yoga/Flexibility', exercises: [
        { name: 'Yoga Flow', sets: 1, reps: '30-45 min', rest: 'N/A' },
        { name: 'Static Stretching', sets: 1, reps: '15 min', rest: 'N/A' }
      ]},
      { day: 'Friday', focus: 'Strength & Core', exercises: [
        { name: 'Goblet Squats', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Incline Push-ups', sets: 3, reps: '12-15', rest: '45s' },
        { name: 'Supermans', sets: 3, reps: '12-15', rest: '30s' },
        { name: 'Side Plank', sets: 3, reps: '30s each', rest: '30s' },
        { name: 'Bicycle Crunches', sets: 3, reps: '20 total', rest: '30s' }
      ]},
      { day: 'Saturday', focus: 'Light Cardio', exercises: [
        { name: 'Cycling/Swimming', sets: 1, reps: '30-45 min', rest: 'N/A' }
      ]},
      { day: 'Sunday', focus: 'Rest & Recovery', exercises: [
        { name: 'Complete Rest or Light Walking', sets: 0, reps: 'N/A', rest: 'N/A' }
      ]}
    ]
  };

  // Sample diet plans based on goals and preferences
  const getDietPlan = () => {
    const { fitnessGoal, dietPreference } = profile;
    
    const meals = {
      bulk: {
        vegetarian: [
          { meal: 'Breakfast', foods: ['2 slices whole grain bread', '2 tbsp peanut butter', '1 banana', '1 glass milk', '1/4 cup greek yogurt with fruits'] },
          { meal: 'Mid-Morning', foods: ['1 handful mixed nuts', '1 apple'] },
          { meal: 'Lunch', foods: ['1.5 cups cooked rice', '1 cup dal', '1 cup paneer curry', '1 cup vegetables', '1 cup yogurt'] },
          { meal: 'Evening Snack', foods: ['1 protein shake with milk', '2-3 whole grain crackers with hummus'] },
          { meal: 'Dinner', foods: ['2 chapatis/rotis', '1 cup rajma (kidney beans)', '1 cup vegetable curry', '1 cup cottage cheese'] },
          { meal: 'Before Bed', foods: ['1 glass milk with turmeric', 'A small handful of nuts'] }
        ],
        nonVegetarian: [
          { meal: 'Breakfast', foods: ['3 whole eggs', '2 slices whole grain bread', '1 glass milk', '1 banana'] },
          { meal: 'Mid-Morning', foods: ['1 protein shake', '1 handful mixed nuts'] },
          { meal: 'Lunch', foods: ['150g chicken breast', '1.5 cups rice', '1 cup vegetables', '1 cup yogurt'] },
          { meal: 'Evening Snack', foods: ['1 apple', '2 boiled eggs', '2-3 whole grain crackers'] },
          { meal: 'Dinner', foods: ['150g fish or lean meat', '2 chapatis/rotis', '1 cup lentils', '1 cup vegetable curry'] },
          { meal: 'Before Bed', foods: ['1 cup cottage cheese or greek yogurt with honey'] }
        ],
        eggetarian: [
          { meal: 'Breakfast', foods: ['3 whole eggs', '2 slices whole grain bread', '1 glass milk', '1 banana'] },
          { meal: 'Mid-Morning', foods: ['1 protein shake', '1 handful mixed nuts'] },
          { meal: 'Lunch', foods: ['1.5 cups rice', '1 cup dal', '2 egg omelette with vegetables', '1 cup yogurt'] },
          { meal: 'Evening Snack', foods: ['1 boiled egg', '1 fruit', '1 handful mixed seeds'] },
          { meal: 'Dinner', foods: ['2 chapatis/rotis', '2 egg curry', '1 cup vegetable curry', '1 cup paneer'] },
          { meal: 'Before Bed', foods: ['1 glass milk with turmeric', '1/4 cup cottage cheese'] }
        ]
      },
      cut: {
        vegetarian: [
          { meal: 'Breakfast', foods: ['1/2 cup oats with almond milk', '1 tbsp chia seeds', '1/2 cup berries'] },
          { meal: 'Mid-Morning', foods: ['1 apple', '10-12 almonds'] },
          { meal: 'Lunch', foods: ['1 cup quinoa', '1 cup mixed vegetables', '1/2 cup chickpeas', '1 cup green salad'] },
          { meal: 'Evening Snack', foods: ['1 protein shake with water', '1 cucumber'] },
          { meal: 'Dinner', foods: ['1 chapati/roti', '1 cup dal', '1 cup vegetable curry', '1/2 cup cottage cheese'] },
          { meal: 'Before Bed (optional)', foods: ['1/2 cup yogurt or small handful of nuts if hungry'] }
        ],
        nonVegetarian: [
          { meal: 'Breakfast', foods: ['2 egg whites + 1 whole egg', '1 slice whole grain bread', '1/2 cup vegetables'] },
          { meal: 'Mid-Morning', foods: ['1 apple', '10 almonds'] },
          { meal: 'Lunch', foods: ['120g chicken breast or fish', '1 cup salad with olive oil', '1/2 cup brown rice'] },
          { meal: 'Evening Snack', foods: ['1 protein shake with water', '1 cucumber'] },
          { meal: 'Dinner', foods: ['100g lean meat or fish', '1 cup steamed vegetables', '1/2 cup lentils'] },
          { meal: 'Before Bed (optional)', foods: ['1/2 cup yogurt if hungry'] }
        ],
        eggetarian: [
          { meal: 'Breakfast', foods: ['2 egg whites + 1 whole egg', '1 slice whole grain bread', '1/2 cup vegetables'] },
          { meal: 'Mid-Morning', foods: ['1 apple', '10 almonds'] },
          { meal: 'Lunch', foods: ['2 egg omelette with vegetables', '1 cup salad', '1/2 cup quinoa or brown rice'] },
          { meal: 'Evening Snack', foods: ['1 protein shake with water', '1 cucumber'] },
          { meal: 'Dinner', foods: ['1 egg + 2 egg whites scrambled', '1 cup steamed vegetables', '1/2 cup lentils'] },
          { meal: 'Before Bed (optional)', foods: ['1/2 cup yogurt if hungry'] }
        ]
      },
      maintain: {
        vegetarian: [
          { meal: 'Breakfast', foods: ['1 cup poha or upma', '1/2 cup yogurt', '1 fruit'] },
          { meal: 'Mid-Morning', foods: ['1 fruit', '1 small handful nuts'] },
          { meal: 'Lunch', foods: ['1 cup rice or 2 chapatis', '1 cup dal', '1 cup vegetable curry', '1/2 cup yogurt'] },
          { meal: 'Evening Snack', foods: ['1 cup tea or coffee', '2-3 whole grain crackers with hummus'] },
          { meal: 'Dinner', foods: ['2 chapatis', '1 cup vegetable curry', '1/2 cup paneer or tofu', '1 cup salad'] }
        ],
        nonVegetarian: [
          { meal: 'Breakfast', foods: ['2 eggs any style', '1 slice toast', '1 fruit'] },
          { meal: 'Mid-Morning', foods: ['1 fruit', '10 almonds'] },
          { meal: 'Lunch', foods: ['100g chicken or fish', '1 cup rice or 2 chapatis', '1 cup vegetable curry'] },
          { meal: 'Evening Snack', foods: ['1 cup tea or coffee', '1 fruit or 1 small handful nuts'] },
          { meal: 'Dinner', foods: ['100g lean meat or fish', '1-2 chapatis', '1 cup vegetables', '1/2 cup dal'] }
        ],
        eggetarian: [
          { meal: 'Breakfast', foods: ['2 eggs any style', '1 slice toast', '1 fruit'] },
          { meal: 'Mid-Morning', foods: ['1 fruit', '1 small handful nuts'] },
          { meal: 'Lunch', foods: ['1 cup rice or 2 chapatis', '1 cup dal', '1 egg curry or omelette', '1/2 cup yogurt'] },
          { meal: 'Evening Snack', foods: ['1 cup tea or coffee', '1 boiled egg or 1 fruit'] },
          { meal: 'Dinner', foods: ['2 chapatis', '1 cup vegetable curry', '1 egg preparation', '1 cup salad'] }
        ]
      }
    };
    
    return meals[fitnessGoal][dietPreference] || meals.maintain.vegetarian; // Default to maintain vegetarian
  };

  return (
    <div className="workouts-page">
      <motion.div 
        className="workouts-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="page-title">My Workouts</h1>
        <p className="page-description">
          Get your personalized workout and diet plan tailored to your goals and preferences.
        </p>
        
        {!isLoggedIn ? (
          <div className="profile-setup-container">
            <div className="setup-header">
              <div className="steps-indicator">
                <div className={`step ${profileStep >= 1 ? 'active' : ''}`}>1</div>
                <div className="step-connector"></div>
                <div className={`step ${profileStep >= 2 ? 'active' : ''}`}>2</div>
                <div className="step-connector"></div>
                <div className={`step ${profileStep >= 3 ? 'active' : ''}`}>3</div>
              </div>
              <h2 className="setup-title">
                {profileStep === 1 && "Basic Information"}
                {profileStep === 2 && "Fitness Preferences"}
                {profileStep === 3 && "Diet & Lifestyle"}
              </h2>
            </div>            <motion.form 
                className="profile-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                key={`form-step-${profileStep}`}
              >
              {profileStep === 1 && (
                <>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={profile.name} 
                      onChange={handleProfileChange} 
                      placeholder="Enter your full name"
                      required 
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="age">Age</label>
                      <input 
                        type="number" 
                        id="age" 
                        name="age" 
                        value={profile.age} 
                        onChange={handleProfileChange} 
                        placeholder="Years"
                        min="15"
                        max="100"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="height">Height</label>
                      <input 
                        type="number" 
                        id="height" 
                        name="height" 
                        value={profile.height} 
                        onChange={handleProfileChange} 
                        placeholder="cm"
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="weight">Weight</label>
                      <input 
                        type="number" 
                        id="weight" 
                        name="weight" 
                        value={profile.weight} 
                        onChange={handleProfileChange} 
                        placeholder="kg"
                        required 
                      />
                    </div>
                  </div>
                </>
              )}
              
              {profileStep === 2 && (
                <>
                  <div className="form-group">
                    <label>What is your primary fitness goal?</label>
                    <div className="radio-cards">
                      <label className={`radio-card ${profile.fitnessGoal === 'bulk' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="fitnessGoal" 
                          value="bulk" 
                          checked={profile.fitnessGoal === 'bulk'} 
                          onChange={handleProfileChange} 
                        />
                        <div className="radio-card-content">
                          <div className="radio-icon">💪</div>
                          <span>Bulk Up</span>
                          <p>Gain muscle mass and strength</p>
                        </div>
                      </label>
                      
                      <label className={`radio-card ${profile.fitnessGoal === 'cut' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="fitnessGoal" 
                          value="cut" 
                          checked={profile.fitnessGoal === 'cut'} 
                          onChange={handleProfileChange} 
                        />
                        <div className="radio-card-content">
                          <div className="radio-icon">🔥</div>
                          <span>Cut/Lose Fat</span>
                          <p>Reduce body fat and get lean</p>
                        </div>
                      </label>
                      
                      <label className={`radio-card ${profile.fitnessGoal === 'maintain' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="fitnessGoal" 
                          value="maintain" 
                          checked={profile.fitnessGoal === 'maintain'} 
                          onChange={handleProfileChange} 
                        />
                        <div className="radio-card-content">
                          <div className="radio-icon">⚖️</div>
                          <span>Maintain</span>
                          <p>Stay at current weight and tone up</p>
                        </div>
                      </label>
                    </div>
                  </div>                  <div className={`form-group lifestyle-form-group ${highlightLifestyle ? 'highlight-select' : ''}`}>                    <label htmlFor="lifestyle-select">What is your lifestyle activity level?</label>
                    <p id="lifestyle-description" className="select-description">This helps calculate your calorie needs and activity-appropriate workouts</p>
                    <div className={`select-wrapper lifestyle-select-wrapper ${highlightLifestyle ? 'highlight-select-wrapper' : ''}`}>
                      <select
                        id="lifestyle-select"
                        name="lifestyle"
                        value={profile.lifestyle}
                        onChange={handleProfileChange}
                        required                        aria-label="Select your lifestyle activity level"
                        aria-describedby="lifestyle-description"
                        className="lifestyle-select"
                      >
                        <option value="sedentary">Sedentary (little to no exercise)</option>
                        <option value="lightlyActive">Lightly Active (light exercise 1-3 days/week)</option>
                        <option value="active">Active (moderate exercise 3-5 days/week)</option>
                        <option value="veryActive">Very Active (hard exercise 6-7 days/week)</option>
                        <option value="extraActive">Extra Active (very hard exercise & physical job)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              
              {profileStep === 3 && (
                <>
                  <div className="form-group">
                    <label>What is your diet preference?</label>
                    <div className="radio-cards">
                      <label className={`radio-card ${profile.dietPreference === 'vegetarian' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="dietPreference" 
                          value="vegetarian" 
                          checked={profile.dietPreference === 'vegetarian'} 
                          onChange={handleProfileChange} 
                        />
                        <div className="radio-card-content">
                          <div className="radio-icon">🥦</div>
                          <span>Vegetarian</span>
                        </div>
                      </label>
                      
                      <label className={`radio-card ${profile.dietPreference === 'nonVegetarian' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="dietPreference" 
                          value="nonVegetarian" 
                          checked={profile.dietPreference === 'nonVegetarian'} 
                          onChange={handleProfileChange} 
                        />
                        <div className="radio-card-content">
                          <div className="radio-icon">🍗</div>
                          <span>Non-Vegetarian</span>
                        </div>
                      </label>
                      
                      <label className={`radio-card ${profile.dietPreference === 'eggetarian' ? 'selected' : ''}`}>
                        <input 
                          type="radio" 
                          name="dietPreference" 
                          value="eggetarian" 
                          checked={profile.dietPreference === 'eggetarian'} 
                          onChange={handleProfileChange} 
                        />
                        <div className="radio-card-content">
                          <div className="radio-icon">🥚</div>
                          <span>Eggetarian</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="allergies">Any food allergies or dislikes?</label>
                    <textarea
                      id="allergies"
                      name="allergies"
                      value={profile.allergies}
                      onChange={handleProfileChange}
                      placeholder="e.g., nuts, dairy, seafood..."
                      rows="3"
                    ></textarea>
                  </div>
                    <div className="form-group budget-form-group">
                    <label htmlFor="budget-select">Budget for food/nutrition</label>
                    <div className="select-wrapper budget-select-wrapper">
                      <select
                        id="budget-select"
                        name="budget"
                        value={profile.budget}
                        onChange={handleProfileChange}
                        aria-label="Select your budget level"
                        className="budget-select"
                      >
                        <option value="low">Low (Budget-friendly options)</option>
                        <option value="medium">Medium (Moderate spending)</option>
                        <option value="high">High (Premium options)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
              
              <div className="form-actions">
                {profileStep > 1 && (
                  <button type="button" onClick={handleBack} className="back-btn">
                    Back
                  </button>
                )}
                <button type="submit" className="next-btn">
                  {profileStep < 3 ? 'Next' : 'Generate Plan'}
                </button>
              </div>
            </motion.form>
          </div>
        ) : (
          <div className="profile-summary">
            <h2>Welcome, {profile.name || 'User'}!</h2>
            <p>Your personalized workout and diet plan is ready below.</p>
          </div>
        )}
        
        {isLoggedIn && (
          <div className="plans-container">
            <div className="user-profile-summary">
              <div className="profile-avatar">
                {user && user.imageUrl ? (
                  <img src={user.imageUrl} alt="Profile" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #a855f7' }} />
                ) : (
                  profile.name.charAt(0).toUpperCase()
                )}
              </div>
              <div className="profile-details">
                <h3>{profile.name}</h3>
                <p>
                  <span>{profile.age} years</span> • 
                  <span>{profile.height} cm</span> • 
                  <span>{profile.weight} kg</span>
                </p>
                <div className="goal-badge">
                  Goal: {profile.fitnessGoal.charAt(0).toUpperCase() + profile.fitnessGoal.slice(1)}
                </div>
              </div>
              <button className="edit-profile-btn" onClick={() => setIsLoggedIn(false)}>
                Edit Profile
              </button>
            </div>

            <div className="plan-tabs">
              <button 
                className={`tab-btn ${showWorkoutPlan ? 'active' : ''}`} 
                onClick={() => togglePlanView('workout')}
              >
                Workout Plan
              </button>
              <button 
                className={`tab-btn ${showDietPlan ? 'active' : ''}`} 
                onClick={() => togglePlanView('diet')}
              >
                Diet Plan
              </button>
            </div>
            
            {showWorkoutPlan && (
              <motion.div 
                className="workout-plan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="plan-header">
                  <h2>Your Custom Workout Plan</h2>
                  <button className="regenerate-btn" onClick={regeneratePlan}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                    Regenerate
                  </button>
                </div>
                
                <div className="workout-days">
                  {workoutPlans[profile.fitnessGoal].map((day, index) => (
                    <motion.div 
                      key={index} 
                      className="workout-day-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="day-header">
                        <h3>{day.day}</h3>
                        <span className="focus-badge">{day.focus}</span>
                      </div>
                      
                      <div className="exercises-list">
                        {day.exercises.map((exercise, exIndex) => (
                          <div key={exIndex} className="exercise-item">
                            <div className="exercise-info">
                              <span className="exercise-name">{exercise.name}</span>
                              <div className="exercise-details">
                                <span>{exercise.sets} sets</span>
                                <span className="separator">•</span>
                                <span>{exercise.reps}</span>
                                {exercise.rest !== 'N/A' && (
                                  <>
                                    <span className="separator">•</span>
                                    <span>Rest: {exercise.rest}</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="exercise-check">
                              <input type="checkbox" id={`exercise-${index}-${exIndex}`} />
                              <label htmlFor={`exercise-${index}-${exIndex}`}></label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {showDietPlan && (
              <motion.div 
                className="diet-plan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="plan-header">
                  <h2>Your Custom Diet Plan</h2>
                  <button className="regenerate-btn" onClick={regeneratePlan}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                    Regenerate
                  </button>
                </div>
                
                <div className="meal-cards">
                  {getDietPlan().map((meal, index) => (
                    <motion.div 
                      key={index} 
                      className="meal-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="meal-header">
                        <h3>{meal.meal}</h3>
                        <div className="meal-icon">
                          {meal.meal === 'Breakfast' && '🍳'}
                          {meal.meal === 'Lunch' && '🍱'}
                          {meal.meal === 'Dinner' && '🍽️'}
                          {meal.meal === 'Mid-Morning' && '🥪'}
                          {meal.meal === 'Evening Snack' && '🍎'}
                          {meal.meal === 'Before Bed' && '🥛'}
                          {meal.meal === 'Before Bed (optional)' && '🥛'}
                        </div>
                      </div>
                      
                      <div className="food-items-list">
                        {meal.foods.map((food, foodIndex) => (
                          <div key={foodIndex} className="food-item">
                            <span className="food-bullet">•</span>
                            <span className="food-name">{food}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="diet-notes">
                  <h3>Notes</h3>
                  <ul>
                    <li>Drink at least 2-3 liters of water daily</li>
                    <li>Adjust portions based on your hunger levels and progress</li>
                    <li>Try to eat at consistent times each day</li>
                    {profile.fitnessGoal === 'bulk' && <li>Aim for a calorie surplus of 300-500 calories daily</li>}
                    {profile.fitnessGoal === 'cut' && <li>Aim for a calorie deficit of 300-500 calories daily</li>}
                    {profile.fitnessGoal === 'maintain' && <li>Focus on nutrient-dense foods that support your activity level</li>}
                  </ul>
                </div>
              </motion.div>
            )}
            
            <div className="community-questions">
              <h3>Have Questions?</h3>
              <p>Our community forum is coming soon! You'll be able to ask questions about your workout or diet plan and get answers from trainers and fellow fitness enthusiasts.</p>
            </div>
          </div>
        )}
        
      </motion.div>
    </div>
  );
};

export default Workouts;
