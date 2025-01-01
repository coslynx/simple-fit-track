import React, { useState, useEffect } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

/**
 * AuthForm Component: Manages user authentication (login/registration).
 * This component uses Input for controlled inputs, Button for form actions,
 * and useAuth for authentication logic.
 *
 * @returns {JSX.Element} The AuthForm component.
 */
const AuthForm = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const { user, loading, login, register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
        navigate('/dashboard');
    }
  }, [user, navigate]);


  /**
   * Handles the form submission for either login or registration.
   * Prevents the default form submission and calls the appropriate authentication function.
   *
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (isLoginMode) {
      try {
        await login(email, password);
        navigate('/dashboard');
      } catch (error) {
         setFormError(error.message);
      }
    } else {
      try {
        await register(username, email, password);
        navigate('/dashboard');
      } catch (error) {
        setFormError(error.message);
      }
    }
  };


    /**
   * Handles the input change and clears errors if any
   * @param {Event} event
   */
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'username':
        setUsername(value);
        setUsernameError('');
        break;
      case 'email':
        setEmail(value);
        setEmailError('');
        break;
      case 'password':
        setPassword(value);
        setPasswordError('');
        break;
      default:
        break;
    }
    setFormError('');
  };


    /**
   * Toggle between the login and registration modes and clears form values and errors
   */
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setUsername('');
    setEmail('');
    setPassword('');
    setUsernameError('');
    setEmailError('');
    setPasswordError('');
    setFormError('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLoginMode ? 'Login' : 'Register'}
        </h2>
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <Input
                id="username"
              type="text"
              label="Username"
              placeholder="Enter your username"
                value={username}
                onChange={handleInputChange}
                error={usernameError}
                required
              />
          )}
          <Input
            id="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            error={emailError}
            required
          />
          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={handleInputChange}
            error={passwordError}
            required
          />
            {formError && <p className="text-red-500 text-xs italic mb-4">{formError}</p>}
          <Button type="submit" className="w-full mb-4" disabled={loading}>
            {loading ? 'Loading...' : isLoginMode ? 'Login' : 'Register'}
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          {isLoginMode ? 'New user?' : 'Already have an account?'}
          <button type="button" className="text-blue-500 hover:underline ml-1" onClick={toggleMode}>
            {isLoginMode ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;