import React, { useState, useEffect } from 'react';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import GoalCard from '../features/goals/GoalCard';
import GoalForm from '../features/goals/GoalForm';
import useFetch from '../hooks/useFetch';

/**
 * Goals Component: Renders the goals page, displaying a list of user's fitness goals.
 * It includes the header, a list of goal cards, a form to create new goals, and the footer.
 * The layout is designed to be responsive using tailwind css classes.
 * @returns {JSX.Element} The Goals component.
 */
const Goals = () => {
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);
    const { data: goals, loading, error } = useFetch('/goals');


    useEffect(() => {
      console.log('Goals Component Mounted');
    }, []);

    /**
     * Handles the display of the GoalForm component, clears any data from the selectedGoal
     */
    const handleShowGoalForm = () => {
        setSelectedGoal(null);
        setShowGoalForm(true);
    };

    /**
     * Handles the hiding of the GoalForm component and clears the selected goal data
     */
    const handleCloseGoalForm = () => {
        setSelectedGoal(null);
        setShowGoalForm(false);
    };


    /**
     * Handles the display of the GoalForm component with the data of the selected goal to edit
     * @param {Object} goal The goal object
     */
    const handleEditGoal = (goal) => {
        setSelectedGoal(goal);
        setShowGoalForm(true);
    };

    if (loading) {
        return <div className="text-center">Loading goals...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Error fetching goals: {error.message}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">My Goals</h2>
                    <button
                      onClick={handleShowGoalForm}
                      className="inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 transition-colors duration-200"
                      type="button"
                    >
                       Add Goal
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {goals && goals.map((goal) => (
                        <div key={goal.id} className="relative">
                            <GoalCard  goal={goal} />
                            <button
                                onClick={() => handleEditGoal(goal)}
                                className="absolute top-2 right-2 inline-flex items-center rounded-md bg-gray-200 px-2 py-1 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-colors duration-200"
                                type="button"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                   </div>
                {showGoalForm && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-md shadow-lg">
                            <GoalForm goal={selectedGoal}  onClose={handleCloseGoalForm}/>
                            <div className="flex justify-end mt-4">
                                <button
                                    onClick={handleCloseGoalForm}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
                                    type="button"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Goals;