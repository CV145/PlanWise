import React, { useState } from 'react';
import PlanCard from '../components/PlanCard';
import FilterOptions from '../components/FilterOptions';
import '../styles/ResultsScreen.css';
import InsuranceInfo from '../components/InsuranceInfo';

const ResultsScreen = ({ plans, onBack }) => {
    const [filteredPlans, setFilteredPlans] = useState(plans);

    const handleFilterChange = (filters) => {
        const filtered = plans.filter(plan => {
            return (
                plan.premium >= filters.premium.min &&
                plan.premium <= filters.premium.max &&
                plan.deductible >= filters.deductible.min &&
                plan.deductible <= filters.deductible.max &&
                plan.copay <= filters.copay.max &&
                plan.coinsurance <= filters.coinsurance.max &&
                plan.outOfPocketMax >= filters.outOfPocketMax.min &&
                plan.outOfPocketMax <= filters.outOfPocketMax.max
            );
        });
        setFilteredPlans(filtered);
    };

    const handleResetFilters = () => {
        setFilteredPlans(plans); // Reset to the original list of plans
    };


    return (
        <div className="results-layout">

            <div className='sidebar'>
                <button onClick={onBack} className="back-button">&#8592;</button>
                <FilterOptions
                    onFilterChange={handleFilterChange}
                    onResetFilters={handleResetFilters}
                />
            </div>

            <div className='main-content'>
                <InsuranceInfo />
                {filteredPlans.length > 0 ? (
                    filteredPlans.map(plan => (
                        <PlanCard key={plan.id} plan={plan} />
                    ))
                ) : (
                    <p>No plans found matching your criteria.</p>
                )}
            </div>
        </div>
    );
};

export default ResultsScreen;
