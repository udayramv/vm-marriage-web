// src/components/ProfileCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillLike, AiFillDislike, AiOutlineLike } from 'react-icons/ai';
import '../App.css';

const ProfileCard = ({ profile, isLiked, onLikeToggle }) => {

  const handleButtonClick = (event) => {
    event.stopPropagation();
    console.log("Liked a profile");
  };

  return (
    <div>
      <Link to={`/profile/${profile.id}`} key={profile.id} className="profile-card-link">
      <div className="profile-card">
        <img
            src={`http://localhost:5000/static/${profile.image}`}
            alt={profile.NAME}
            className="profile-image"
        />
        <h3>{profile.NAME}</h3>
        <p>Age: {profile.age}</p>
        <p>Gender: {profile.gender}</p>
      </div>
      </Link>
      
      {/* NEW: Like/Unlike button */}
      <button 
        className={`like-button ${isLiked ? 'liked' : ''}`}
        onClick={
          () => { 
            onLikeToggle(profile.id);
            // handleButtonClick();
          }
        }
      >
        {/* {isLiked ? '❤️ Unlike' : '🤍 Like'} */}
        {isLiked ? (
            <AiFillLike color="blue" size="24" /> // Blue for liked state
          ) : (
            <AiOutlineLike color="grey" size="24" /> // Gray for unliked state
          )}
      </button>
      
    </div>
  );
};

export default ProfileCard;

{/*<div className="profile-list">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            // Wrap the profile card in a Link component to navigate to its detail page
            <Link to={`/profile/${profile.id}`} key={profile.id} className="profile-card-link">
              <div className="profile-card">
                <img
                  src={`http://localhost:5000/static/${profile.image}`}
                  alt={profile.NAME}
                  className="profile-image"
                />
                <h3>{profile.NAME}</h3>
                <p>Age: {profile.age}</p>
                <p>Gender: {profile.gender}</p>
                <button 
                  className={`like-button ${isLiked ? 'liked' : ''}`}
                  onClick={() => onLikeToggle(profile.id)}
                >
                  {isLiked ? '❤️ Unlike' : '🤍 Like'}
                </button>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p>No profiles found matching your criteria.</p>
        )}
      </div>*/}