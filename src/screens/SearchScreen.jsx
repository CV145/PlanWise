import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/SearchScreen.css';
import LoadingScreen from './LoadingScreen';
import { searchPlans } from '../services/api';
import ResultsScreen from './ResultsScreen';

const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
    'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const abbrv = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
];



const SearchScreen = () => {
    const variants = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 }
    };


    const [searchParams, setSearchParams] = useState({
        gender: 'Male',
        dob: '',
        state: '',
        zipCode: '',
        income: '',
        tobacco: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);



    const handleGenderChange = (e) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            gender: e.target.value
        }));
    };

    const handleTobaccoChange = (e) => {
        setSearchParams(prevParams => ({
            ...prevParams,
            tobacco: e.target.value === 'Yes' //Converts 'Yes' to true
        }));
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setSearchParams(prevParams => ({
                ...prevParams,
                [name]: checked
            }));
        } else if (name === "income") {
            // Income formatting logic
            const numericValue = value.replace(/[^\d]/g, '').slice(0, 7);
            const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            setSearchParams(prevParams => ({
                ...prevParams,
                [name]: formattedValue
            }));
        } else {
            setSearchParams(prevParams => ({
                ...prevParams,
                [name]: value
            }));
        }
    };

    const handleBack = () => {
        setShowResults(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Parse income to a number
        const incomeValue = parseInt(searchParams.income.replace(/,/g, ''), 10);

        // Use incomeValue for further processing or API calls
        console.log({ ...searchParams, income: incomeValue });

        try {
            const data = await searchPlans(searchParams);
            setResults(data);
            setShowResults(true); // Show the results screen
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) {
        return <LoadingScreen />
    }
    else if (showResults) {
        return <ResultsScreen plans={results.plans} onBack={handleBack} />;
    }
    else {
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

                    <label htmlFor="gender">Gender:</label>
                    <div className="gender-selection">
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={searchParams.gender === 'Male'}
                                onChange={handleGenderChange}
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={searchParams.gender === 'Female'}
                                onChange={handleGenderChange}
                            />
                            Female
                        </label>
                    </div>

                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                        name="dob"
                        type="date"
                        value={searchParams.dob}
                        onChange={handleChange}
                        className="search-input"
                        placeholder="Date of Birth"
                    />


                    <div className="location-fields">
                        <div className="form-group">
                            <label htmlFor="state">State:</label>
                            <select
                                name="state"
                                value={searchParams.state}
                                onChange={handleChange}
                                className="search-select"
                            >
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="zipCode">Zip Code:</label>
                            <input
                                name="zipCode"
                                type="text"
                                pattern="\d{5}"
                                value={searchParams.zipCode}
                                onChange={handleChange}
                                className="search-input"
                                placeholder="Zip Code"
                                maxLength={5}
                            />
                        </div>
                    </div>

                    <label htmlFor="income">Annual Income:</label>
                    <input
                        name="income"
                        type="text"
                        pattern="\d*"
                        value={searchParams.income}
                        onChange={handleChange}
                        className="search-input"
                        placeholder="Annual Income"
                        min="0"
                        maxLength={7}
                    />

                    <label htmlFor="tobacco">Used tobacco in the past 12 months:</label>
                    <div className="gender-selection">
                        <label>
                            <input
                                type="radio"
                                name="tobacco"
                                value="Yes"
                                checked={searchParams.tobacco === true}
                                onChange={handleTobaccoChange}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="tobacco"
                                value="No"
                                checked={searchParams.tobacco === false}
                                onChange={handleTobaccoChange}
                            />
                            No
                        </label>
                    </div>

                    <button className="search-button" type="submit">Search</button>
                </form>
            </motion.div >
        )
    }
};

export default SearchScreen;

