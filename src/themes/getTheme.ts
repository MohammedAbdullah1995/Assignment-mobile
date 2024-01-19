// Import the COUNTRY_NAME enum from "../utils/enums"
import { COUNTRY_NAME } from "../utils/enums";
// Import theme files for specific countries
import EG_THEME from "./countries/eg.theme";
import INDIA_THEME from "./countries/in.theme";
import PAKISTAN_THEME from "./countries/pk.theme";
import UAE_THEME from "./countries/uae.theme";

// Define a function getTheme that takes a countryName as an argument
const getTheme = (countryName) => {
    // Return the theme associated with the provided countryName using the themeMapper
    return themeMapper[countryName];
};

// Define a themeMapper object that maps COUNTRY_NAME enum values to their respective themes
const themeMapper = {
    [COUNTRY_NAME.UAE]: UAE_THEME,
    [COUNTRY_NAME.EG]: EG_THEME,
    [COUNTRY_NAME.IN]: INDIA_THEME,
    [COUNTRY_NAME.PK]: PAKISTAN_THEME,
};

// Export the getTheme function for use in the application
export default getTheme;
