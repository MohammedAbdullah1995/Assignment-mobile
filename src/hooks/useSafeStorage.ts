// Import the Expo SecureStore module for secure storage
import * as SecureStore from 'expo-secure-store';

// Custom hook for safe storage using Expo SecureStore
const useSafeStorage = () => {
    // Function to save object properties securely in the storage
    const save = async (object: object) => {
        // Iterate over object properties and save each key-value pair in the storage
        Object.keys(object).forEach(async (key) => {
            await SecureStore.setItemAsync(key, object[key]);
        });
    };

    // Function to get the stored value for a given key
    const getValueFor = async (key: string) => {
        // Retrieve the value associated with the key from the secure storage
        const result = await SecureStore.getItemAsync(key);
        return result;
    };

    // Return the functions for saving and retrieving values securely
    return {
        save,
        getValueFor
    };
};

// Export the custom hook for secure storage
export default useSafeStorage;
