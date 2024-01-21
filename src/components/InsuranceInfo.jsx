import React, { useState } from 'react';
import '../styles/InsuranceInfo.css';

const InsuranceInfo = () => {
    const [isContentVisible, setContentVisible] = useState(false);

    const toggleContent = () => {
        setContentVisible(!isContentVisible);
    };


    return (
        <div className="insurance-info-container">
            {isContentVisible && (
                <div className="insurance-info">
                    <h3>Health Insurance Details</h3>
                    <p><strong>Premium:</strong> The amount you pay for your health insurance every month. This is like a subscription fee and is determined by factors such as plan type, age, location, tobacco use, and the number of people covered under the plan.</p>
                    <p><strong>Deductible:</strong> The amount you pay for covered health care services before your insurance plan starts to pay. For example, with a $1,000 deductible, you pay the first $1,000 of services yourself. After that, you typically pay a copay for covered services, and the insurance covers the rest.</p>
                    <p><strong>Copay:</strong> A fixed amount you pay for a health care service, like $30 for a doctor's visit or $15 for a prescription.</p>
                    <p><strong>Co-Insurance:</strong> Your share of the costs of a covered health care service, calculated as a percentage of the allowed amount for the service. You pay co-insurance plus any deductibles you owe.</p>
                    <p><strong>Out-of-Pocket Maximum:</strong> The most you have to pay for covered services in a plan year. After you spend this amount on deductibles, copays, and co-insurance, your health plan pays 100% of the costs of covered benefits.</p>
                </div>
            )}
            <div className="insurance-info-footer">
                <button onClick={toggleContent} className="toggle-button">
                    {isContentVisible ? 'Hide' : 'Show'}
                </button>
            </div>
        </div>
    );
};

export default InsuranceInfo;
