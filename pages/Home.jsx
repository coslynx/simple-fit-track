import React from 'react';
import Header from '../layout/Header';
import AuthForm from '../features/auth/AuthForm';
import Footer from '../layout/Footer';

/**
 * Home Component: Renders the landing page for the application.
 * It includes the header, authentication form, and footer.
 * The layout is designed to have the footer at the bottom of the viewport.
 * @returns {JSX.Element} The Home component.
 */
const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <AuthForm />
            </div>
            <Footer />
        </div>
    );
};

export default Home;