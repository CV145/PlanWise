import React from 'react';
import '../styles/HomeScreen.css';
import { motion } from 'framer-motion';


const HomeScreen = ({ onGetStartedClick }) => {
    // Define your animation variants
    const variants = {
        enter: { opacity: 0, y: 200 },
        center: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -100 }
    };


    return (
        <motion.div
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            <div className="container">
                <h1 className="title">Welcome to PlanWise</h1>
                <p className="subtitle">Find the best health insurance plan for you and your family.</p>
                <button className="button" onClick={onGetStartedClick}>Get Started</button>
            </div>
        </motion.div>
    );
};

export default HomeScreen;
