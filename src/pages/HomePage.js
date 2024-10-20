import React from "react";
import ButtonWidget from '../components/ButtonWidget'
import { Link } from 'react-router-dom';
const HomePage = () => {
    return (
        <div>
            <div className="container mx-auto mt-48 mb-4 text-left">
                <h1 className="text-6xl leading-none tracking-tight text-gray-900 md:text-6xl lg:text-6xl dark:text-white">Welcome ,</h1>
                <h3 className="text-4xl leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">Building Tomorrow's Solutions, Today.</h3>
            </div>
            <div className="text-left">
                <Link to="/trending">
                    <ButtonWidget>Get Started</ButtonWidget>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;