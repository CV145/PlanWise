import React from 'react';
import { motion } from 'framer-motion';
import '../styles/LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="loading-screen"
        >
            <div className="loading-screen">
                <div className="spinner"></div>
                <p>Loading...</p>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
