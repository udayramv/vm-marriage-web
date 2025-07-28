// src/components/Favorites.js
import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import { getProfiles } from '../api';
import useLikes from '../hooks/useLikes';
import '../App.css'; // Re-use styles for the grid

const Favorites = ({ toggleTheme, theme }) => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { likedIds, toggleLike, isLiked } = useLikes();

  useEffect(() => {
    const fetchAllProfiles = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all profiles (or profiles by ID if your API supports it)
        const allProfilesData = await getProfiles(0);
        const allProfiles = allProfilesData.profiles;
        console.log(allProfiles);
        console.log(allProfiles[0].id);
        
        // Filter the fetched profiles to only include the liked ones
        const favoriteProfiles = allProfiles.filter(profile => 
          likedIds.includes(profile.id)
        );
        // console.log(likedIds);
        // console.log("toggle Like");
        // console.log(toggleLike);
        // console.log(isLiked);
        console.log(favoriteProfiles);

        setProfiles(favoriteProfiles);
      } catch (err) {
        setError('Failed to load favorite profiles.');
      } finally {
        setLoading(false);
      }
    };

    if (likedIds.length > 0) {
      fetchAllProfiles();
    } else {
      setProfiles([]);
      setLoading(false);
    }
  }, [likedIds]); // Re-run effect whenever likedIds change

  return (
    <div className="home-container">
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <h1 className="title">Your Liked Profiles</h1>

      {loading && <p>Loading your favorite profiles...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && profiles.length === 0 && <p>You haven't liked any profiles yet!</p>}

      <div className="profile-list">
        {profiles.map(profile => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            isLiked={isLiked(profile.id)}
            onLikeToggle={toggleLike}
          />
        ))}
      </div>

      {/* <div ClassName='profile-list'>
        {profiles.length > 0 ? (
          profiles.map(profile => (
          // <Link to={`/profile/${profile.id}`} key={profile.id} className="profile-card-link">
          <ProfileCard
            key={profile.id}
            profile={profile}
            isLiked={isLiked(profile.id)} // Pass the like state as a prop
            onLikeToggle={toggleLike}     // Pass the toggle function as a prop
          />
          // </Link>
        )) 
        ) : (
          !loading && <p>No profiles found matching your criteria.</p>
        )} 
      </div> */}
    </div>
  );
};

export default Favorites;