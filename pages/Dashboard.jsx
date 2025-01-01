import React, { useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import DashboardStats from '../features/dashboard/DashboardStats';

/**
 * Dashboard Component: Renders the main dashboard page for the application.
 * It includes the header, dashboard statistics, and footer.
 * The layout is designed to have the footer at the bottom of the viewport.
 * @returns {JSX.Element} The Dashboard component.
 */
const Dashboard = () => {

    useEffect(() => {
      console.log('Dashboard Component Mounted');
    }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <DashboardStats />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;