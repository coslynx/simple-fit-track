import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, truncateText } from '../../utils/helpers';

/**
 * GoalCard Component: Displays information about a fitness goal.
 *
 * @param {Object} props - The component props.
 * @param {number} props.goal.id - The unique identifier of the goal.
 * @param {string} props.goal.name - The name of the goal.
 * @param {string} props.goal.description - The description of the goal.
 * @param {string} props.goal.startDate - The start date of the goal (YYYY-MM-DD).
 * @param {string} props.goal.endDate - The end date of the goal (YYYY-MM-DD).
 * @param {number} props.goal.targetValue - The target value for the goal.
 * @returns {JSX.Element} The GoalCard component.
 */
const GoalCard = ({ goal }) => {
    const { id, name, description, startDate, endDate, targetValue } = goal;

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    const truncatedDescription = truncateText(description || '', 100);

    return (
        <div className="bg-white p-4 rounded-md shadow-md m-2">
            <h2 className="text-xl font-bold mb-2 text-gray-800">{name}</h2>
            {truncatedDescription && (
                 <p className="text-gray-800 mb-2">{truncatedDescription}</p>
            )}
             <p className="font-bold text-gray-800 mb-2">Target: {targetValue}</p>
             {formattedStartDate && <p className="text-gray-800 text-sm">Start Date: {formattedStartDate}</p>}
            {formattedEndDate && <p className="text-gray-800 text-sm">End Date: {formattedEndDate}</p>}
        </div>
    );
};

GoalCard.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        targetValue: PropTypes.number.isRequired,
    }).isRequired,
};


export default GoalCard;