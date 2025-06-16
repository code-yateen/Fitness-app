import React, { useEffect, useState } from 'react';
import './PageStyles.css';
import { FiEdit2, FiAward, FiActivity, FiUser } from 'react-icons/fi';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    photo: 'https://randomuser.me/api/portraits/men/54.jpg',
    fitnessLevel: 'Intermediate',
    weight: 75,
    height: 178,
    workoutsCompleted: 24,
    streakDays: 8,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserData(prevData => ({
        ...prevData,
        name: parsedUser.name,
        email: parsedUser.email,
      }));
    }
  }, []);

  // Calculate BMI
  const calculateBMI = () => {
    const heightInMeters = userData.height / 100;
    return (userData.weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  return (
    <div className="profile-minimal-wrapper">
      <div className="profile-minimal-card">
        <div className="profile-minimal-avatar-section">
          <img src={userData.photo} alt={userData.name} className="profile-minimal-avatar" />
          <button className="profile-minimal-edit" title="Edit Profile">
            <FiEdit2 />
          </button>
        </div>
        <h2 className="profile-minimal-name">{userData.name}</h2>
        <div className="profile-minimal-email">{userData.email}</div>
        <div className="profile-minimal-level">
          <FiAward /> {userData.fitnessLevel}
        </div>
        <div className="profile-minimal-stats">
          <div className="profile-minimal-stat">
            <span className="stat-label">Height</span>
            <span className="stat-value">{userData.height} cm</span>
          </div>
          <div className="profile-minimal-stat">
            <span className="stat-label">Weight</span>
            <span className="stat-value">{userData.weight} kg</span>
          </div>
          <div className="profile-minimal-stat">
            <span className="stat-label">BMI</span>
            <span className="stat-value">{calculateBMI()}</span>
          </div>
        </div>
        <div className="profile-minimal-actions">
          <div className="profile-minimal-action">
            <FiActivity />
            <span>{userData.workoutsCompleted} Workouts</span>
          </div>
          <div className="profile-minimal-action">
            <FiUser />
            <span>{userData.streakDays} Day Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
