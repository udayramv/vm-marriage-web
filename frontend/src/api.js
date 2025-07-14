import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getProfiles = async (page = 1, filters = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles`, {
      params: {
        page: page,
        gender: filters.gender,
        age_min: filters.age_min,
        age_max: filters.age_max,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    return { profiles: [], total_pages: 1, current_page: 1, total_profiles: 0 };
  }
};

// New function to fetch a single profile
export const getSingleProfile = async (profileId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles/${profileId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching profile with ID ${profileId}:`, error);
    throw error; // Re-throw to handle in component
  }
};