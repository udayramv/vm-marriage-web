// MarriageMatcherMobileApp/screens/ProfileDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Alert, Button, Platform, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { getSingleProfile } from '../api';

const ProfileDetailScreen = ({ route, navigation }) => {
  const { profileId } = route.params; // Get profileId from navigation params
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchProfileDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getSingleProfile(profileId);
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile details. This profile might not exist.');
        Alert.alert('Error', 'Failed to load profile details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfileDetails();
  }, [profileId]); // Re-fetch if profileId changes

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profile details...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorMessage}>{error}</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noProfileText}>Profile not found.</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const imageUrl = Platform.OS === 'android'
    ? `http://192.168.1.125:5000/static/${profile.image}`
    : `http://localhost:5000/static/${profile.image}`;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={[styles.detailImage, {
          width: width * 0.6, // 60% of screen width
          height: width * 0.6, // Keep aspect ratio (square image)
          borderRadius: (width * 0.6) / 2,
        }]}
        contentFit="cover"
        transition={200}
      />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.detail}>Age: {profile.age}</Text>
      <Text style={styles.detail}>Gender: {profile.gender}</Text>
      <Text style={styles.detail}>Occupation: {profile.occupation}</Text>
      <Text style={styles.bio}>
        This is a placeholder bio for {profile.name}. In a real application, more
        personal details, interests, and preferences would be displayed here.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20, // Consider responsive padding as well
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  detailImage: {
    //width: 200,
    //height: 200,
    //borderRadius: 100,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#eee',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detail: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  noProfileText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileDetailScreen;