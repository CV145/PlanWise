import React, { useState } from 'react';
import '../styles/FilterOptions.css';

const FilterOptions = ({ onFilterChange, onResetFilters }) => {
    const [filters, setFilters] = useState({
        premium: { min: 0, max: 1000 },
        deductible: { min: 0, max: 5000 },
        copay: { max: 100 },
        coinsurance: { max: 30 }, // Assuming percentage
        outOfPocketMax: { min: 0, max: 10000 }
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [filter, key] = name.split('.');
        setFilters(prevFilters => ({
            ...prevFilters,
            [filter]: {
                ...prevFilters[filter],
                [key]: value
            }
        }));
    };

    const handleReset = () => {
        setFilters({
            premium: { min: 0, max: 1000 },
            deductible: { min: 0, max: 5000 },
            copay: { max: 100 },
            coinsurance: { max: 30 },
            outOfPocketMax: { min: 0, max: 10000 }
        });
        onResetFilters();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilterChange(filters);
    };

    return (
        <div className="filter-options">
            <form onSubmit={handleSubmit}>
                <div>
                    <label className="filter-label">Premium Range:</label>
                    <input type="number" name="premium.min" value={filters.premium.min} onChange={handleInputChange} className="filter-input" />
                    <input type="number" name="premium.max" value={filters.premium.max} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Deductible Range:</label>
                    <input type="number" name="deductible.min" value={filters.deductible.min} onChange={handleInputChange} className="filter-input" />
                    <input type="number" name="deductible.max" value={filters.deductible.max} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Max Copay:</label>
                    <input type="number" name="copay.max" value={filters.copay.max} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Max Coinsurance (%):</label>
                    <input type="number" name="coinsurance.max" value={filters.coinsurance.max} onChange={handleInputChange} className="filter-input" />
                </div>
                <div>
                    <label className="filter-label">Out-of-Pocket Maximum Range:</label>
                    <input type="number" name="outOfPocketMax.min" value={filters.outOfPocketMax.min} onChange={handleInputChange} className="filter-input" />
                    <input type="number" name="outOfPocketMax.max" value={filters.outOfPocketMax.max} onChange={handleInputChange} className="filter-input" />
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
