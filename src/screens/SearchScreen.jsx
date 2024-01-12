import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/SearchScreen.css';

const SearchScreen = () => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };


    const [searchParams, setSearchParams] = useState({
        age: '',
        location: '',
        income: '',
        coverage: ''
        // Add more fields as necessary
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prevParams => ({
            ...prevParams,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle submission like making an API call
        // or transitioning to the results component
        console.log(searchParams);
    };

    return (
        <motion.div
            className="search-container"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ duration: 0.5 }}
        >
            <h1 className="search-title">Find Your Plan</h1>
            <form className="search-form" onSubmit={handleSubmit}>
                <input
                    name="age"
                    type="number"
                    value={searchParams.age}
                    onChange={handleChange}
                    className="search-input"
                    placeholder="Age"
                />
                <input
                    name="location"
                    type="text"
                    value={searchParams.location}
                    onChange={handleChange}
                    className="search-input"
                    placeholder="Location"
                />
                <input
                    name="income"
                    type="number"
                    value={searchParams.income}
                    onChange={handleChange}
                    className="search-input"
                    placeholder="Income"
                />
                <input
                    name="coverage"
                    type="text"
                    value={searchParams.coverage}
                    onChange={handleChange}
                    className="search-input"
                    placeholder="Coverage Type"
                />
                {/* Add more input fields as necessary */}
                <button className="search-button" type="submit">Search</button>
            </form>
        </motion.div >
    );
};

export default SearchScreen;
