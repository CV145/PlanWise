import React from 'react';
import '../styles/HomeScreen.css';

const HomeScreen = () => {

    const handleClick = () => {

    }

    return (
        <div className="container">
            <h1 className="title">Welcome to PlanWise</h1>
            <p className="subtitle">Find the best health insurance plan for you and your family.</p>
            <button className="button" onClick={handleClick}>Get Started</button>
        </div>
    );
};

export default HomeScreen;
