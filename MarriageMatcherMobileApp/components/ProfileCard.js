import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';

const ProfileCard = ({ profile, onPress }) => {
  const { width } = useWindowDimensions();

  // Calculate sizes based on screen width
  const cardWidth = width * 0.9; // Card takes 90% of screen width
  const cardMarginHorizontal = width * 0.05; // 5% margin on each side
  const imageSize = width * 0.2; // Image size is 20% of screen width

  const imageUrl = Platform.OS === 'android'
    ? `http://192.168.1.125:5000/static/${profile.image}`
    : `http://localhost:5000/static/${profile.image}`;

  return (
    <TouchableOpacity
      onPress={() => onPress(profile.id)}
      style={[
        styles.card,
        { width: cardWidth, marginHorizontal: cardMarginHorizontal }
      ]}
    >
      <Image
        source={{ uri: imageUrl }}
        style={[styles.image, { width: imageSize, height: imageSize, borderRadius: imageSize / 2 }]}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.detail}>Age: {profile.age}</Text>
        <Text style={styles.detail}>Gender: {profile.gender}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 8,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  image: {
    // Dynamically sized via inline style
    marginRight: 15,
  },
  infoContainer: {
    flex: 1, // Ensures this container takes up remaining space
  },
  name: {
    fontSize: 18, // Consider `normalize` here if you need more precise font scaling
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    fontSize: 14, // Consider `normalize` here
    color: '#555',
  },
});

export default ProfileCard;