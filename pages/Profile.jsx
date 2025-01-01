import React, { useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import useFetch from '../hooks/useFetch';
import { useMemo } from 'react';

/**
 * Profile Component: Renders the user profile page with user information.
 * It includes the header, user profile details, and footer.
 * Fetches profile data from the /profile endpoint using the useFetch hook.
 * Handles loading and error states gracefully, displays appropriate messages.
 *
 * @returns {JSX.Element} The Profile component.
 */
const Profile = React.memo(() => {
    const { data: profile, loading, error } = useFetch('/profile');


  useEffect(() => {
    console.log('Profile Component Mounted');
  }, []);


  const profileContent = useMemo(() => {
      if (loading) {
          return <div className="text-center">Loading profile...</div>;
      }

      if (error) {
          return <div className="text-center text-red-500">Error fetching profile: {error.message}</div>;
      }

      if (!profile) {
          return <div className="text-center">No profile data available.</div>
      }
      return (
          <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">User Profile</h2>
              <div className="mb-4">
                  <span className="block font-bold text-gray-700 mb-2">Username:</span>
                  <p className="text-gray-800">{profile.username}</p>
              </div>
              <div className="mb-4">
                  <span className="block font-bold text-gray-700 mb-2">Email:</span>
                  <p className="text-gray-800">{profile.email}</p>
              </div>
          </div>
      );

  }, [loading, error, profile]);


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <main className="flex-grow flex items-center justify-center">
              {profileContent}
           </main>
            <Footer />
        </div>
    );
});

Profile.displayName = 'Profile';

export default Profile;