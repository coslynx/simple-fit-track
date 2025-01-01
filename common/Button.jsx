import React from 'react';
import PropTypes from 'prop-types';

/**
 * A reusable button component that accepts onClick as a function,
 * children as the button text or elements, and className as a string.
 * Utilizes global.css for base styles and supports arbitrary styling through the className prop.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onClick - The function to be called when the button is clicked.
 * @param {React.ReactNode} props.children - The button's content.
 * @param {string} props.className - Additional CSS class names for styling.
 * @returns {JSX.Element} The button component.
 */
const Button = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-block rounded-md px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ${className}`}
      role="button"
      type="button"
    >
      {children}
    </button>
  );
};


Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
    onClick: () => {},
    className: ''
};


export default Button;