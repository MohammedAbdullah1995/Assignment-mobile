// Import necessary module for managing state in functional components
import { useState } from "react";

// Import interface for the registration payload
import { RegistrationPayload } from "../utils/interfaces";

// Import base-64 encoding utility
import { encode } from 'base-64';

// Import API endpoint for user registration
import { REGISTER } from "../network/endpoints";

// Custom hook for adding a user
const useAddUser = () => {
    // State to track loading status
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Firebase authentication token for accessing the registration endpoint
    const token = process.env.EXPO_PUBLIC_FIREBASE_DB_TOKEN;

    // URL for the registration endpoint with authentication token
    const url = `${REGISTER}?auth=${token}`;

    // Function to add a user
    const addUser = async (payload: RegistrationPayload) => {
        // Set loading status to true when the request is initiated
        setIsLoading(true);

        // Encode the username and password using base-64 encoding
        // A better encoding must be done here like AES encryption
        // Used for simplicity
        const encodedUsername = encode(payload.username);
        const encodedPassword = encode(payload.password);

        // Create the final payload with encoded username and password
        const finalPayload: RegistrationPayload = {
            username: encodedUsername,
            password: encodedPassword,
            country: payload.country,
            email: payload.email
        };

        try {
            // Send a POST request to the registration endpoint with the final payload
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(finalPayload)
            });

            // Parse the JSON response
            const json = await response.json();

            // Return the parsed JSON response
            return json;
        } catch (error) {
            // If an error occurs during the request, return the error
            return error;
        } finally {
            // Set loading status to false when the request is completed (either success or failure)
            setIsLoading(false);
        }
    };

    // Return the functions and state needed for user registration
    return {
        addUser,
        isLoading
    };
};

// Export the custom hook
export default useAddUser;
