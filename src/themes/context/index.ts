// Import React from 'react'
import React from 'react';
// Import the COUNTRY_NAME enum from '../../utils/enums'
import { COUNTRY_NAME } from '../../utils/enums';

// Create a React context named ThemeContext with default values
const ThemeContext = React.createContext({
    // Function to toggle the theme based on the selected country
    toggleTheme: (value: COUNTRY_NAME) => { },
    // Default countryName value is set to COUNTRY_NAME.UAE
    countryName: COUNTRY_NAME.UAE,
});

// Export the ThemeContext for use in the application
export default ThemeContext;
