import React, { useState } from 'react';
import PlanCard from '../components/PlanCard';
import FilterOptions from '../components/FilterOptions';
import '../styles/ResultsScreen.css';
import InsuranceInfo from '../components/InsuranceInfo';

const ResultsScreen = ({ plans, onBack }) => {
    const [filteredPlans, setFilteredPlans] = useState(plans);

    const handleFilterChange = (filters) => {
        // Ensure the values are strings before replacing commas
        const parseFilterValue = (value) => {
            // Convert value to a string and then replace commas
            const stringValue = String(value || '');
            return parseInt(stringValue.replace(/,/g, ''), 10);
        };


        // Parse the filter values
        const parsedFilters = {
            premiumMax: parseFilterValue(filters.premiumMax),
            deductibleMax: parseFilterValue(filters.deductibleMax),
            copayMax: parseFilterValue(filters.copayMax),
            coinsuranceMax: parseFilterValue(filters.coinsuranceMax),
            outOfPocketMax: parseFilterValue(filters.outOfPocketMax)
        };

        const filtered = plans.filter(plan => {
            // Apply the filters using parsedFilters
            const premiumInRange = plan.premium <= parsedFilters.premiumMax;
            const deductibleInRange = plan.deductibles.some(deductible =>
                deductible.amount <= parsedFilters.deductibleMax
            );
            const outOfPocketMaxInRange = plan.moops.some(moop =>
                moop.amount <= parsedFilters.outOfPocketMax
            );

            // Check if any copay in the plan's benefits meets the maximum copay filter
            const copayMeetsCriteria = plan.benefits.some(benefit =>
                benefit.cost_sharings.some(cost => cost.copay_amount <= parsedFilters.copayMax)
            );

            // Check if any coinsurance in the plan's benefits meets the maximum coinsurance filter
            const coinsuranceMeetsCriteria = plan.benefits.some(benefit =>
                benefit.cost_sharings.some(cost => cost.coinsurance_rate <= parsedFilters.coinsuranceMax / 100) // Assuming percentage
            );

            return premiumInRange && deductibleInRange && copayMeetsCriteria && coinsuranceMeetsCriteria && outOfPocketMaxInRange;
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
