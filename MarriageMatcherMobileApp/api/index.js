// MarriageMatcherMobileApp/api/index.js
import axios from 'axios';
import { Platform } from 'react-native';

const API_BASE_URL = Platform.OS === 'android'
  ? 'http://192.168.1.125:5000/api'
  : 'http://192.168.1.125:5000/api'; // For iOS simulator (or web if you enable it later)

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
    throw error;
  }
};

export const getSingleProfile = async (profileId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/profiles/${profileId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching profile with ID ${profileId}:`, error);
    throw error;
  }
};