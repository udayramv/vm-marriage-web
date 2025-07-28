// frontend/src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported
import { getProfiles } from '../api';
import useLikes from '../hooks/useLikes';
import ProfileCard from './ProfileCard';
import './Home.css';
// import '../App.css'; // Assuming App.css contains shared styles, or create Home.css if preferred

const Home = ({ toggleTheme, theme }) => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState(0);
  // const [sortFilters, setSortFilters] = useState({ sort_age: '' });
  const [sortOrder, setSortOrder] = useState({reverse: ''});
  const [filters, setFilters] = useState({ gender: '', age_min: '', age_max: '', name: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { likedIds, toggleLike, isLiked } = useLikes();

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfiles(currentPage, filters, sortOrder);
      
      // setProfiles([]);
      setProfiles(data.profiles);
      setTotalPages(data.total_pages);
      setTotalProfiles(data.total_profiles);
    } catch (err) {
      setError('Failed to fetch profiles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [currentPage, filters, sortOrder]); // Re-fetch when page or filters change

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // const handleSortByAgeExist = () => {
  //   const sortedProfiles = [...profiles];

  //    if (sortOrder === 'asc'){
  //     // Initial sort, sort ascending
  //     sortedProfiles.sort((a, b) => a.age - b.age);
  //    } else {
  //     sortedProfiles.sort((a, b) => b.age - a.age);
  //    };
  //    setProfiles(sortedProfiles);
  // };

  const handleSortByAge = () => {
    // Create a copy of the profiles array to avoid mutating state directly

    if (sortOrder.reverse === 'false') {
      // Sort descending
      setSortOrder({ reverse: 'true' });
      setProfiles([]);
      setCurrentPage(1);
    } else {
      // Sort ascending
      setSortOrder({ reverse: 'false' });
      setProfiles([]);
      setCurrentPage(1);
    };
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setProfiles([]);
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleClearFilters = () => {
    setFilters({ gender: '', age_min: '', age_max: '', name: '' });
    // setSortFilters({sort_age: ''})
    setSortOrder({reverse: ''});
    setProfiles([]);
    setCurrentPage(1);
  };

  return (
    <div className="App">

      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
        </button>
      </div>

      <header class="header">
        <div class="wrapper">
            <div class="mlogo">
               <img src={`http://localhost:5000/static/marriage_icon.jpg`} alt="a logo"></img>
            </div>
            <h1 class="header-text">
            Marriage Profiles
            </h1>
        </div>
      </header>

      <div className="filters">
        <select name="gender" value={filters.gender} onChange={handleFilterChange}>
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input
          type="number"
          name="age_min"
          placeholder="Min Age"
          value={filters.age_min}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="age_max"
          placeholder="Max Age"
          value={filters.age_max}
          onChange={handleFilterChange}
        />
        <input
          type="search"
          name="name"
          placeholder="Name"
          value={filters.name}
          onChange={handleFilterChange}
        />
        <button onClick={handleClearFilters} ClassName='clear-button'>Clear Filters</button>
          
        
        {/* <button onClick={handleSortByAge}>Age</button> */}
        {/* <button onClick={handleSortChange}>Age {filters.sort_age === 'false' ? <FaSortUp /> : <FaSortDown />}</button> */}
        {/* <button onClick={handleSortChange}>Age {filters.sort_age === 'false' ? <BiSolidUpArrow /> : <BiSolidDownArrow />}</button> */}
        {/* <button onClick={handleSortChange}>
          <FontAwesomeIcon icon={filters.sort_age ? FaSortUp : FaSortDown} />
          Age</button> */}
        <button onClick={handleSortByAge} ClassName='sort-button'>
          {sortOrder.reverse === 'false' ? '▲' : sortOrder.reverse === 'true' ? '▼' : '⇅'}
        </button>
      </div>

      {loading && <p>Loading profiles...</p>}
      {error && <p className="error-message">{error}</p>}

      {/* Profile List Display */}
      <div className="profile-list">
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
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages} ({totalProfiles} profiles total)
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Home; // This line is crucial for proper import in App.js