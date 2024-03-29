import React, { useState } from 'react';
import '../styles/FilterOptions.css';

const FilterOptions = ({ onFilterChange, onResetFilters }) => {
    const [filters, setFilters] = useState({
        premiumMax: numberWithCommas("1000"),
        deductibleMax: numberWithCommas("5000"),
        copayMax: numberWithCommas("100"),
        coinsuranceMax: numberWithCommas("30"), // Assuming percentage
        outOfPocketMax: numberWithCommas("10000")
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = numberWithCommas(value.replace(/,/g, ''));
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: formattedValue
        }));
    };


    const handleReset = () => {
        setFilters({
            premiumMax: numberWithCommas("1000"),
            deductibleMax: numberWithCommas("5000"),
            copayMax: numberWithCommas("100"),
            coinsuranceMax: numberWithCommas("30"), // Assuming percentage
            outOfPocketMax: numberWithCommas("10000")
        });
        onResetFilters();
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    return (
        <div className="filter-options">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="filter-label">Max Premium:</label>
                    <input type="text" name="premiumMax" value={filters.premiumMax} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Max Deductible:</label>
                    <input type="text" name="deductibleMax" value={filters.deductibleMax} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Max Copay:</label>
                    <input type="text" name="copayMax" value={filters.copayMax} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Max Coinsurance (%):</label>
                    <input type="text" name="coinsuranceMax" value={filters.coinsuranceMax} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Max Out-of-Pocket:</label>
                    <input type="text" name="outOfPocketMax" value={filters.outOfPocketMax} onChange={handleInputChange} className="filter-input" />
                </div>



                <div className="filter-buttons">
                    <button type="submit" className="filter-button">Apply Filters</button>
                    <button type="button" onClick={handleReset} className="filter-button reset">Reset Filters</button>
                </div>

            </form>

        </div>
    );
};

export default FilterOptions;
