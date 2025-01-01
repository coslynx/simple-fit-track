import React from 'react';

/**
 * Footer Component: Renders the site footer with a copyright notice.
 * Uses global.css for styling. The copyright message includes the current year.
 *
 * @returns {JSX.Element} The Footer component.
 */
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-800 p-4 text-white text-center">
            <p>© {currentYear} Fitness Tracker. All rights reserved.</p>
        </footer>
    );
};

export default Footer;