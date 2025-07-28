import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSingleProfile } from '../api';
import '../App.css'; // Create this CSS file for styling

function ProfileDetail() {
  const { id } = useParams(); // Get the profile ID from the URL
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getSingleProfile(parseInt(id));
        setProfile(data);
      } catch (err) {
        setError('Failed to load profile details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div className="profile-detail-container">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-detail-container error-message">{error}</div>;
  }

  if (!profile) {
    return <div className="profile-detail-container">Profile not found.</div>;
  }

  return (
    <div className="profile-detail-container">
      <Link to="/" className="back-button">← Back to Profiles</Link>
      <div className="profile-detail-card">
        <img
          src={`http://localhost:5000/static/${profile.image}`}
          alt={profile.NAME}
          className="detail-profile-image"
        />
        <h2>{profile.NAME}</h2>
        <p><strong>Age:</strong> {profile.age}</p>
        <p><strong>Gender:</strong> {profile.gender}</p>
        {/* <p><strong>Occupation:</strong> {profile.occupation}</p> */}
        <p><strong>Nakshatram and Padham:</strong> {profile.NAKSHATRA}</p>
        <p><strong>Date of Birth:</strong> {profile.DOB}</p>
        <p><strong>Time of Birth:</strong> {profile.TIME}</p>
        <p><strong>Height:</strong> {profile.HEIGHT}</p>
        <p><strong>Education:</strong> {profile.STUDY}</p>
        <p><strong>Family:</strong> {profile.FAMILY}</p>
        <p><strong>Native Place:</strong> {profile.NATIVE}</p>
        <p><strong>Job Location:</strong> {profile.Job_Location}</p>
        {/* 'HEIGHT', 'STUDY', 'Job_Location', 'FAMILY', 'NATIVE' */}
        {/* Add more details here as needed */}
        <p className="bio"> Reachout to the support on the phone: 222-523-1999, or via email: abc@marriageMatch.com, for more details and contacts of this profile.</p>
        <p className='bio'> Thank you for visiting this website, see more - localhost:3000/ </p>
      </div>
    </div>
  );
}

export default ProfileDetail;