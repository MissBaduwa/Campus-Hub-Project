import React, { useEffect, useState } from 'react';
import { fetchUserProfile, fetchUserRSVPs, updateUserPreferences } from '../../utils/api';


const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [rsvps, setRSVPs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newPreferences, setNewPreferences] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = token ? JSON.parse(atob(token.split('.')[1])).id : null;

    if (id) {
      const fetchProfileData = async () => {
        try {
          const userProfile = await fetchUserProfile(id);
          setProfile(userProfile.data);

          const userRSVPs = await fetchUserRSVPs(id);
          setRSVPs(userRSVPs.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchProfileData();
    }
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewPreferences(profile.preferences || '');
  };

  const handleSavePreferences = async () => {
    const token = localStorage.getItem('token');
    const id = token ? JSON.parse(atob(token.split('.')[1])).id : null;

    if (id) {
      try {
        await updateUserPreferences(id, newPreferences);
        setProfile((prevState) => ({ ...prevState, preferences: newPreferences }));
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating preferences:', error);
      }
    }
  };

  if (!profile) {
    return <div>Loading profile...</div>;
  }


  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-6">

 
          <div className="flex-1 space-y-2">
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>
            <p><strong>Preferences:</strong> {profile.preferences || 'No preferences set'}</p>
          </div>

          <div className="w-32 h-32 bg-gray-200 rounded-full flex-shrink-0">
            <img
              src="/img6.jpg"
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <div>
          <h2 className="font-semibold">RSVP'd Events:</h2>
          {rsvps.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rsvps.map((event, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-4">
                  <h3 className="text-xl font-semibold">{event.name}</h3>
                  <p className="text-gray-600">Date: {new Date(event.event_date).toLocaleDateString()}</p>
                  <p className="text-gray-600">Location: {event.location}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No events RSVP'd yet.</p>
          )}
        </div>

        <div className="mt-6">
          {isEditing ? (
            <div>
              <textarea
                className="w-full p-2 border rounded"
                value={newPreferences}
                onChange={(e) => setNewPreferences(e.target.value)}
              />
              <button
                className="bg-blue-900 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-800"
                onClick={handleSavePreferences}
              >
                Save Preferences
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-900 text-white px-4 py-3 rounded-lg hover:bg-pink-500"
              onClick={handleEditClick}
            >
              Update Preferences
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default Profile;
