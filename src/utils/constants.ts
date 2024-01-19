// Import the COUNTRY_NAME enum from "./enums"
import { COUNTRY_NAME } from "./enums";

// Define an array of country dropdown items with labels and values
export const countryDropDownItems = [
   { label: COUNTRY_NAME.UAE, value: COUNTRY_NAME.UAE },
   { label: COUNTRY_NAME.EG, value: COUNTRY_NAME.EG },
   { label: COUNTRY_NAME.IN, value: COUNTRY_NAME.IN },
   { label: COUNTRY_NAME.PK, value: COUNTRY_NAME.PK }
];

// Define a set of username validation rules for different countries
export const usernameCountryRules = {
   [COUNTRY_NAME.UAE]: { regex: /^[a-zA-Z0-9]{5,}$/, errorMessage: 'validations.uae.username' },
   [COUNTRY_NAME.IN]: { regex: /^[a-zA-Z][a-zA-Z0-9]{5,}$/, errorMessage: 'validations.in.username' },
   [COUNTRY_NAME.EG]: { regex: /^[a-zA-Z]{2}[a-zA-Z0-9]*\d[a-zA-Z0-9]*$/, errorMessage: 'validations.eg.username' },
   [COUNTRY_NAME.PK]: { regex: /^[a-zA-Z]{3}[a-zA-Z0-9]{4,}$/, errorMessage: 'validations.pk.username' }
};

// Define a function to validate the username based on country rules
export const validateUsername = (value: string, countryName: COUNTRY_NAME) => {
   // Retrieve the regex and error message based on the country
   const { regex, errorMessage } = usernameCountryRules[countryName];
   // Create a regular expression object for the country-specific regex
   const countryRegex = new RegExp(regex);
   // Test if the value matches the country-specific regex
   return countryRegex.test(value) ? true : errorMessage;
};

// Define an array of language dropdown items with labels and values
export const lanDropDownItems = [
   { label: 'English', value: 'en' },
   { label: 'French', value: 'fr' },
   { label: 'German', value: 'de' }
];
