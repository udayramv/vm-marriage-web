// src/hooks/useLikes.js
import { useState, useEffect } from 'react';

const LIKES_STORAGE_KEY = 'likedProfileIds';

const useLikes = () => {
  // Load initial state from localStorage or default to an empty array
  const [likedIds, setLikedIds] = useState(() => {
    try {
      const storedLikes = localStorage.getItem(LIKES_STORAGE_KEY);
      // console.log(JSON.parse(storedLikes));
      return storedLikes ? JSON.parse(storedLikes) : [];
    } catch (error) {
      console.error('Failed to load liked profiles from localStorage:', error);
      return [];
    }
  });

  // Use useEffect to save likedIds to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(likedIds));
      // console.log(localStorage.getItem(LIKES_STORAGE_KEY));
    } catch (error) {
      console.error('Failed to save liked profiles to localStorage:', error);
    }
  }, [likedIds]);

  // Function to add or remove a profile ID from the liked list
  const toggleLike = (profileId) => {
    setLikedIds(prevLikedIds => {
      const isLiked = prevLikedIds.includes(profileId);
      if (isLiked) {
        return prevLikedIds.filter(id => id !== profileId);
      } else {
        return [...prevLikedIds, profileId];
      }
    });
  };

  const isLiked = (profileId) => likedIds.includes(profileId);

  return { likedIds, toggleLike, isLiked };
};

export default useLikes;