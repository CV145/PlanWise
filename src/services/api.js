//Handles API requests to Marketplace API

const stateAbbreviations = {
    "Alabama": "AL",
    "Alaska": "AK",
    "Arizona": "AZ",
    "Arkansas": "AR",
    "California": "CA",
    "Colorado": "CO",
    "Connecticut": "CT",
    "Delaware": "DE",
    "Florida": "FL",
    "Georgia": "GA",
    "Hawaii": "HI",
    "Idaho": "ID",
    "Illinois": "IL",
    "Indiana": "IN",
    "Iowa": "IA",
    "Kansas": "KS",
    "Kentucky": "KY",
    "Louisiana": "LA",
    "Maine": "ME",
    "Maryland": "MD",
    "Massachusetts": "MA",
    "Michigan": "MI",
    "Minnesota": "MN",
    "Mississippi": "MS",
    "Missouri": "MO",
    "Montana": "MT",
    "Nebraska": "NE",
    "Nevada": "NV",
    "New Hampshire": "NH",
    "New Jersey": "NJ",
    "New Mexico": "NM",
    "New York": "NY",
    "North Carolina": "NC",
    "North Dakota": "ND",
    "Ohio": "OH",
    "Oklahoma": "OK",
    "Oregon": "OR",
    "Pennsylvania": "PA",
    "Rhode Island": "RI",
    "South Carolina": "SC",
    "South Dakota": "SD",
    "Tennessee": "TN",
    "Texas": "TX",
    "Utah": "UT",
    "Vermont": "VT",
    "Virginia": "VA",
    "Washington": "WA",
    "West Virginia": "WV",
    "Wisconsin": "WI",
    "Wyoming": "WY"
};


export async function searchPlans(searchParams) {
    const url = `http://localhost:3000/api/plans/search`;
    const headers = {
        'Content-Type': 'application/json',
    };

    // Calculate age from DOB
    const calculateAge = (dob) => {
        const birthday = new Date(dob);
        const ageDifMs = Date.now() - birthday.getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    // Construct the request body using searchParams and default values
    const body = {
        household: {
            income: parseInt(searchParams.income) ?? '', // Default income, note 0 is a falsey value
            people: [
                {
                    age: searchParams.dob ? calculateAge(searchParams.dob) : '', // Default age
                    aptc_eligible: true, // Assuming always true for simplicity
                    gender: searchParams.gender || '', // Default gender
                    uses_tobacco: searchParams.tobacco
                }
            ]
        },
        market: 'Individual',
        place: {
            // Assuming you have a function to fetch countyfips based on zipCode
            countyfips: await fetchCountyFIPS(searchParams.zipCode) || '', // Default countyfips
            state: stateAbbreviations[searchParams.state] || '', // Default state
            zipcode: searchParams.zipCode || '' // Default zipcode
        },
        year: new Date().getFullYear() // Assuming a fixed year for simplicity
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
    const url = `http://localhost:3000/api/countyfips/${zipCode}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Assuming the first county in the array is the desired one
        const countyFips = data.counties && data.counties.length > 0 ? data.counties[0].fips : null;

        return countyFips; // This should be a string like "48113"
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