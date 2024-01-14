import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="loading-screen"
        >
            <div className="loading-content">
                <p>Loading...</p>
                {/* Here you can add a spinner or any loading animation */}
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
