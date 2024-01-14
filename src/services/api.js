//Handles API requests to Marketplace API

const API_KEY = ""; // Replace with your API key

export async function searchPlans(searchParams) {
    const API_KEY = "your_api_key_here"; // Replace with your actual API key
    const url = `https://marketplace.api.healthcare.gov/api/v1/plans/search?apikey=${API_KEY}`;
    const headers = {
        'Content-Type': 'application/json'
    };

    // Provide default values for the parameters not included in searchParams
    const body = {
        aptc_override: searchParams.aptc_override || 0,
        household: {
            effective_date: searchParams.household?.effective_date || new Date().toISOString().split('T')[0],
            has_married_couple: searchParams.household?.has_married_couple || false,
            income: searchParams.household?.income || 0,
            unemployment_received: searchParams.household?.unemployment_received || 'None',
            people: searchParams.household?.people || [{
                age: 30,
                dob: '1990-01-01',
                aptc_eligible: true,
                does_not_cohabitate: false,
                gender: "Male",
                has_mec: false,
                is_parent: false,
                is_pregnant: false,
                relationship: "Self",
                uses_tobacco: false,
                utilization: "Medium"
            }]
        },
        market: searchParams.market || "Individual",
        place: {
            countyfips: searchParams.place?.countyfips || "",
            state: searchParams.place?.state || "",
            zipcode: searchParams.place?.zipcode || ""
        },
        year: searchParams.year || new Date().getFullYear()
    };

    try {
        const response = await fetch(url, {
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