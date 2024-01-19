//Handles API requests to Marketplace API

const API_KEY = "";

export async function searchPlans(searchParams) {

    const url = `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${API_KEY}`;
    const headers = {
        'Content-Type': 'application/json',
        'apikey': 'U52FZtIuwfk0nLf3dIXiZV5js6OQCSHh'
    };

    // Provide default values for the parameters not included in searchParams
    const body = {
        household: {
            income: 52000,
            people: [
                {
                    age: 27,
                    aptc_eligible: true,
                    gender: 'Female',
                    uses_tobacco: false
                }
            ]
        },
        market: 'Individual',
        place: {
            countyfips: '37057',
            state: 'NC',
            zipcode: '27360'
        },
        year: 2019
    };

    try {
        const response = await fetch('http://localhost:3000/api/plans/search', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching plan data:', error);
        throw error;
    }
}

export async function fetchCountyFIPS(zipCode) {
    const url = `https://marketplace.api.healthcare.gov/api/v1/counties/by/zip/${zipCode}?apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data; // The data should contain the county FIPS code
    } catch (error) {
        console.error('Error fetching county FIPS code:', error);
        throw error;
    }
}

export async function fetchPlanDetails(planId, year) {
    const url = `https://marketplace.api.healthcare.gov/api/v1/plans/${planId}?year=${year}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const planDetails = await response.json();
        return planDetails; // This contains the details of the specified health insurance plan
    } catch (error) {
        console.error('Error fetching plan details:', error);
        throw error;
    }
}