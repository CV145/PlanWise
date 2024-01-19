//Displays insurance plan information

import React from 'react';
import '../styles/PlanCard.css';

const PlanCard = ({ plan }) => {
    // Extracting the deductible and out-of-pocket maximum
    const deductible = plan.deductibles.find(d => d.network_tier === "In-Network");
    const outOfPocketMax = plan.moops.find(m => m.network_tier === "In-Network");

    return (
        <div className="plan-card">
            <h3 className="plan-card-title">{plan.name}</h3>
            <div className="plan-card-content">
                <p><strong>Premium:</strong> ${plan.premium}</p>
                <p><strong>Deductible:</strong> ${deductible ? deductible.amount : 'Not available'}</p>
                <p><strong>Out-of-Pocket Maximum:</strong> ${outOfPocketMax ? outOfPocketMax.amount : 'Not available'}</p>

                <div className="benefits-grid">
                    {plan.benefits.map((benefit, index) => (
                        <div key={index} className="benefit-section">
                            <h4>{benefit.name}</h4>
                            {benefit.cost_sharings.map((cost, idx) => (
                                <div key={idx} className="cost-sharing-detail">
                                    <p><strong>Network Tier:</strong> {cost.network_tier}</p>
                                    <p><strong>Copay:</strong> ${cost.copay_amount}</p>
                                    <p><strong>Coinsurance:</strong> {cost.coinsurance_rate * 100}%</p>
                                    {/* Display other cost-sharing details as needed */}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

};
export default PlanCard;


/*
-Health Insurance Details-

Premium: Amount you pay for your health insurance every month,regardless of whether you use medical services or not. Subscription fee. Determined by plan type, age, location, tobacco use, # of people covered under the plan.

Deductible: The amount you pay for covered health care services before the insurance plan starts to pay. Example: $1000 deductible requires you pay the first $1,000 of services yourself. After that you pay a copay of covered services and the insurance handles the rest.

Copay: Fixed amount paid for a health care service. Example: $30 for a doctor's visit or $15 for a prescription.

Co-Ins: A portion of the total cost you need to pay after your deductible.

Out-of-Pocket Maximum: The most you have to pay for covered services in a plan year. After this is spent on deductibles, copays, and coinsurance, the health plan pays 100% of the costs of covered benefits.

*/
