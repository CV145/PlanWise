import React from 'react';
import PlanCard from '../components/PlanCard';
import '../styles/ResultsScreen.css';

const ResultsScreen = ({ plans }) => {
    console.log(plans);
    return (
        <div className="results-container">
            {plans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
            ))}
        </div>
    );
};

export default ResultsScreen;
