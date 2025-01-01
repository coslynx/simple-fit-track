import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable input component that accepts various props for form inputs.
 * It includes handling for labels, placeholders, controlled values, and error display.
 * Utilizes global.css for base styles and supports arbitrary styling through the className prop.
 *
 * @param {Object} props - The component props.
 * @param {string} props.id - The input's ID, required for label association.
 * @param {string} [props.type='text'] - The input type (text, email, password, etc.).
 * @param {string} [props.label] - The label text for the input.
 * @param {string} [props.placeholder] - The input's placeholder text.
 * @param {*} props.value - The input's value, for controlled input.
 * @param {Function} props.onChange - The event handler for input change.
 * @param {Function} [props.onBlur] - The event handler for input blur.
 * @param {string} [props.error] - The error message to display below the input.
 * @param {boolean} [props.required=false] - Indicates if the input is required.
 * @param {string} [props.className] - Additional CSS class names for styling.
 * @returns {JSX.Element} The input component.
 */
const Input = ({
  id,
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  onBlur = () => {},
  error,
  required = false,
  className = '',
}) => {
  const handleChange = (event) => {
    onChange(event);
  };

  const handleBlur = (event) => {
     onBlur(event);
  };

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          error ? 'border-red-500' : ''
        } ${className}`}
        required={required}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  required: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  className: '',
  required: false,
  onBlur: () => {},
};

export default Input;