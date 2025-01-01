import React, { useContext, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/global.css';

/**
 * Header Component: Renders the site header with navigation links and user authentication status.
 * Uses React Router for navigation and AuthContext for authentication state.
 *
 * @returns {JSX.Element} The Header component.
 */
const Header = () => {
  const { user } = useContext(AuthContext);

    useEffect(() => {
      console.log('Header Component Mounted');
    }, []);


  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Fitness Tracker
        </Link>
        <nav className="flex space-x-4">
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    `text-gray-300 hover:text-white px-3 py-2 rounded-md ${
                        isActive ? 'text-white bg-gray-700' : ''
                    }`
                }
            >
                Dashboard
            </NavLink>
            <NavLink
                to="/goals"
                className={({ isActive }) =>
                    `text-gray-300 hover:text-white px-3 py-2 rounded-md ${
                        isActive ? 'text-white bg-gray-700' : ''
                    }`
                }
            >
                Goals
            </NavLink>
          {user && (
            <NavLink
                to="/profile"
                className={({ isActive }) =>
                `text-gray-300 hover:text-white px-3 py-2 rounded-md ${
                    isActive ? 'text-white bg-gray-700' : ''
                }`
            }
            >
              Profile
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;