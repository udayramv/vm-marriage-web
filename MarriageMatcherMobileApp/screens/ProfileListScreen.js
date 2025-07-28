import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Button, TextInput, Platform, useWindowDimensions } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import ProfileCard from '../components/ProfileCard';
import { getProfiles } from '../api';

const ProfileListScreen = ({ navigation }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genderFilter, setGenderFilter] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const { width } = useWindowDimensions();

  const filterElementWidth = (width - (16 * 2) - (8 * 3)) / 4;
  const pickerWidth = width * 0.3; // 30% of screen width
  const inputWidth = width * 0.22; // ~22% for each input
  const buttonWidth = width * 0.2; // ~20% for button

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const filters = {
        gender: genderFilter === 'all' ? null : genderFilter,
        age_min: minAge ? parseInt(minAge) : null,
        age_max: maxAge ? parseInt(maxAge) : null,
      };
      const data = await getProfiles(currentPage, filters);
      setProfiles(data.profiles);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Failed to fetch profiles. Please check your network and backend server.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [currentPage, genderFilter, minAge, maxAge]); // Dependency array for re-fetching

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClearFilters = () => {
    setGenderFilter('');
    setMinAge('');
    setMaxAge('');
    setCurrentPage(1);
  };

  if (loading && profiles.length === 0) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading profiles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marriage Match Selection</Text>

      <View style={styles.filtersContainer}>
        {/* Gender Filter */}
        {Platform.OS === 'android' ? (
          <Picker
            selectedValue={genderFilter}
            style={[styles.picker, { width: pickerWidth }]} // Apply dynamic width
            onValueChange={(itemValue) => {
              setGenderFilter(itemValue);
              setCurrentPage(1); // Reset page on filter change
            }}
          >
            <Picker.Item label="All Genders" value="all" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        ) : (
          // Fallback for non-Android platforms or if Picker isn't suitable
          <TextInput
            style={[styles.input, { width: pickerWidth }]}
            placeholder="Gender (male/female/all)"
            value={genderFilter}
            onChangeText={(text) => {
              setGenderFilter(text);
              setCurrentPage(1);
            }}
          />
        )}

        {/* Min Age Filter */}
        <TextInput
          style={[styles.input, { width: inputWidth }]} // Apply dynamic width
          placeholder="Min Age"
          keyboardType="numeric"
          value={minAge}
          onChangeText={(text) => {
            setMinAge(text);
            setCurrentPage(1);
          }}
        />
        {/* Max Age Filter */}
        <TextInput
          style={[styles.input, { width: inputWidth }]} // Apply dynamic width
          placeholder="Max Age"
          keyboardType="numeric"
          value={maxAge}
          onChangeText={(text) => {
            setMaxAge(text);
            setCurrentPage(1);
          }}
        />
        {/* Clear Filters Button */}
        <Button title="Clear" onPress={handleClearFilters} /> {/* Changed to "Clear" for brevity */}
      </View>

      {error && <Text style={styles.errorMessage}>{error}</Text>}

      {profiles.length > 0 ? (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProfileCard profile={item} onPress={(id) => navigation.navigate('ProfileDetail', { profileId: id })} />
          )}
          ListFooterComponent={() => (loading && profiles.length > 0 ? <ActivityIndicator style={{ marginVertical: 10 }} size="small" color="#0000ff" /> : null)}
        />
      ) : (
        !loading && <Text style={styles.noProfilesText}>No profiles found matching your criteria.</Text>
      )}

      {/* Pagination Controls */}
      <View style={styles.paginationContainer}>
        <Button title="Previous" onPress={handlePrevPage} disabled={currentPage === 1 || loading} />
        <Text style={styles.pageText}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button title="Next" onPress={handleNextPage} disabled={currentPage === totalPages || loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 7, // This is key for the container to take full height
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    backgroundColor: '#f5f5f5',
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#333',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  picker: {
    height: 60,
   // width: '30%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    //width: '25%',
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  noProfilesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileListScreen;