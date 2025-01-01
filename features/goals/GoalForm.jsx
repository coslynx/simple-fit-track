import React, { useState, useEffect } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import useFetch from '../../hooks/useFetch';
import { z } from 'zod';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { formatDate } from '../../utils/helpers';

/**
 * GoalForm Component: Manages the creation and editing of fitness goals.
 * It uses Input components for controlled inputs, Button for submission, and useFetch for API interaction.
 *
 * @param {Object} props - The component props.
 * @param {Object} [props.goal] - The goal object for editing (optional).
 * @returns {JSX.Element} The GoalForm component.
 */
const GoalForm = ({ goal }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [targetValue, setTargetValue] = useState('');
    const [nameError, setNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [startDateError, setStartDateError] = useState('');
    const [endDateError, setEndDateError] = useState('');
    const [targetValueError, setTargetValueError] = useState('');
    const [formError, setFormError] = useState('');
    const { loading, error,  } = useFetch('/goals');

    // Define a schema for the Goal data validation
    const goalSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        description: z.string().optional(),
        startDate: z.string().optional().nullable().refine(value => {
          if (!value) return true
          try {
              const date = new Date(value);
              return !isNaN(date.getTime())
            } catch (e) {
                return false
            }
        }, { message: "Invalid start date" }),
        endDate: z.string().optional().nullable().refine(value => {
            if (!value) return true
          try {
                const date = new Date(value);
                return !isNaN(date.getTime())
             } catch (e) {
                    return false
                }
            }, { message: "Invalid end date" }),
        targetValue: z.string().refine(value => {
            if (!value) return false
                const number = Number(value)
                return !isNaN(number);
           }, { message: "Target Value is required and should be a number" }),
    });

    useEffect(() => {
        if (goal) {
            setName(goal.name || '');
            setDescription(goal.description || '');
            setStartDate(formatDate(goal.startDate) || '');
            setEndDate(formatDate(goal.endDate) || '');
            setTargetValue(String(goal.targetValue) || '');
        }
    }, [goal]);

    /**
     * Handles the form submission for creating or updating a goal.
     * Validates the form inputs and sends the data to the API.
     *
     * @param {Event} event - The form submit event.
     */
    const handleSubmit = async (event) => {
        event.preventDefault();
        clearError();


        try {
            goalSchema.parse({ name, description, startDate, endDate, targetValue });

            const goalData = {
                name,
                description,
                startDate,
                endDate,
                targetValue: Number(targetValue)
            };


            let response;
            if (goal && goal.id) {
              response = await api.put(`/goals/${goal.id}`, goalData);
            } else {
              response = await api.post('/goals', goalData);
            }

           if(response.status >= 200 && response.status < 300) {
            clearForm()
           } else {
            setFormError(`Failed to ${goal ? 'update' : 'create'} goal. Please try again.`)
           }

        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((err) => {
                    switch (err.path[0]) {
                        case 'name':
                            setNameError(err.message);
                            break;
                        case 'description':
                            setDescriptionError(err.message);
                            break;
                        case 'startDate':
                            setStartDateError(err.message);
                            break;
                        case 'endDate':
                            setEndDateError(err.message);
                            break;
                         case 'targetValue':
                            setTargetValueError(err.message);
                            break;
                        default:
                            setFormError('Validation error')
                            break;
                    }
                });
            } else {
                setFormError(`Error ${goal ? 'updating' : 'creating'} goal: ${error.message}`);
            }
        }
    };


   /**
     * Handles input changes for each field.
     * Clears the error message associated with the input and updates the input value state.
     *
     * @param {Event} event - The input change event.
     */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        switch (name) {
            case 'name':
                setName(value);
                setNameError('');
                break;
            case 'description':
                setDescription(value);
                setDescriptionError('');
                break;
            case 'startDate':
                setStartDate(value);
                setStartDateError('');
                break;
            case 'endDate':
                setEndDate(value);
                setEndDateError('');
                break;
            case 'targetValue':
                setTargetValue(value);
                 setTargetValueError('');
                break;
            default:
                break;
        }
        setFormError('');
    };

    /**
     * Clears all the input fields and error states
     */
    const clearForm = () => {
        setName('');
        setDescription('');
        setStartDate('');
        setEndDate('');
        setTargetValue('');
        clearError()
    };

    /**
     * Clears all the errors in the form
     */
    const clearError = () => {
        setNameError('');
        setDescriptionError('');
        setStartDateError('');
        setEndDateError('');
        setTargetValueError('');
         setFormError('');
    }


    return (
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {goal ? 'Edit Goal' : 'Create Goal'}
            </h2>
            {formError && <p className="text-red-500 text-xs italic mb-4">{formError}</p>}
            <form onSubmit={handleSubmit}>
                 <Input
                    id="name"
                    type="text"
                    label="Name"
                    placeholder="Enter goal name"
                    value={name}
                    onChange={handleInputChange}
                    error={nameError}
                    required
                />
                 <Input
                    id="description"
                    type="text"
                    label="Description"
                    placeholder="Enter goal description"
                    value={description}
                    onChange={handleInputChange}
                    error={descriptionError}
                />
                 <Input
                    id="startDate"
                    type="date"
                    label="Start Date"
                    value={startDate}
                    onChange={handleInputChange}
                     error={startDateError}
                />
                 <Input
                    id="endDate"
                    type="date"
                    label="End Date"
                    value={endDate}
                    onChange={handleInputChange}
                    error={endDateError}
                />
                <Input
                    id="targetValue"
                    type="number"
                    label="Target Value"
                    placeholder="Enter target value"
                    value={targetValue}
                    onChange={handleInputChange}
                    error={targetValueError}
                    required
                 />
                <Button type="submit" className="w-full mt-4" disabled={loading}>
                    {loading ? 'Loading...' : goal ? 'Update Goal' : 'Add Goal'}
                </Button>
            </form>
        </div>
    );
};

GoalForm.propTypes = {
    goal: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        targetValue: PropTypes.number,
    }),
};


export default GoalForm;