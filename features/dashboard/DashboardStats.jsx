import React from 'react';
import useFetch from '../../hooks/useFetch';
import PropTypes from 'prop-types';
import {  useState, useEffect, useCallback, useMemo } from 'react';
/**
 * DashboardStats Component: Displays key fitness statistics for the user.
 * Fetches data from the /dashboard API endpoint using the useFetch hook.
 * Handles loading and error states gracefully.
 *
 * @returns {JSX.Element} The DashboardStats component.
 */
const DashboardStats = React.memo(() => {
    const { data, loading, error } = useFetch('/dashboard');
    const [stats, setStats] = useState({
        totalWorkouts: 0,
        totalCaloriesBurned: 0,
        averageWorkoutTime: 0,
        bestWorkoutTime: 0,
    });

    useEffect(() => {
        if (data) {
          setStats(prevStats => ({
             totalWorkouts: data.totalWorkouts != null ? data.totalWorkouts : 0,
            totalCaloriesBurned: data.totalCaloriesBurned != null ? data.totalCaloriesBurned : 0,
            averageWorkoutTime: data.averageWorkoutTime != null ? data.averageWorkoutTime : 0,
            bestWorkoutTime: data.bestWorkoutTime != null ? data.bestWorkoutTime : 0,
          }))
        }
    }, [data]);


    const dashboardContent = useMemo(() => {
        if (loading) {
            return <div className="text-center">Loading dashboard stats...</div>;
        }

        if (error) {
            return <div className="text-center text-red-500">Error fetching dashboard stats: {error.message}</div>;
        }

        if (!data) {
            return <div className="text-center">No data available.</div>
        }

       return(
        <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Dashboard Statistics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-700">
                <span className="font-bold">Total Workouts:</span>
                <span > {stats.totalWorkouts}</span>
              </div>
               <div className="text-gray-700">
                <span className="font-bold">Total Calories Burned:</span>
                   <span > {stats.totalCaloriesBurned}</span>
              </div>
              <div className="text-gray-700">
                <span className="font-bold">Average Workout Time:</span>
                 <span > {stats.averageWorkoutTime} mins</span>
              </div>
                <div className="text-gray-700">
                    <span className="font-bold">Best Workout Time:</span>
                    <span > {stats.bestWorkoutTime} mins</span>
                </div>
            </div>
        </div>
        );

    }, [loading, error, data, stats]);

    return dashboardContent;

});

DashboardStats.displayName = 'DashboardStats';

export default DashboardStats;