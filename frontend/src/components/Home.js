// frontend/src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Make sure Link is imported
import { getProfiles } from '../api';
import '../App.css'; // Assuming App.css contains shared styles, or create Home.css if preferred

function Home() {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProfiles, setTotalProfiles] = useState(0);
  const [filters, setFilters] = useState({ gender: '', age_min: '', age_max: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProfiles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProfiles(currentPage, filters);
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
  }, [currentPage, filters]); // Re-fetch when page or filters change

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1); // Reset to page 1 when filters change
  };

  const handleClearFilters = () => {
    setFilters({ gender: '', age_min: '', age_max: '' });
    setCurrentPage(1);
  };

  return (
    <div className="App"> {/* You can apply global styles via App.css here */}
      
      {/* <div> */}
      {/* <h1><img src={`http://localhost:5000/static/marriage_icon.jpg`} alt={`marriage logo`} className="header-image"/>Marriage Profiles</h1> */}
      {/* </div> */}

      {/* <div class="header">
        <img src={`http://localhost:5000/static/marriage_icon.jpg`} alt="marriage logo" className='header-image'/>
        <h1>Marriage Match Selection</h1>
      </div> */}
      {/* <h1>Marriage Profiles</h1> */}

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
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>

      {loading && <p>Loading profiles...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="profile-list">
        {profiles.length > 0 ? (
          profiles.map((profile) => (
            // Wrap the profile card in a Link component to navigate to its detail page
            <Link to={`/profile/${profile.id}`} key={profile.id} className="profile-card-link">
              <div className="profile-card">
                <img
                  src={`http://localhost:5000/static/${profile.image}`}
                  alt={profile.name}
                  className="profile-image"
                />
                <h3>{profile.name}</h3>
                <p>Age: {profile.age}</p>
                <p>Gender: {profile.gender}</p>
                {/* Occupation is commented out to save space in the list view,
                    but is available on the detail page. */}
                {/* <p>Occupation: {profile.occupation}</p> */}
              </div>
            </Link>
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