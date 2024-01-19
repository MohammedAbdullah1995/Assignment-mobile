// Import the adaptNavigationTheme function from 'react-native-paper'
import { adaptNavigationTheme } from "react-native-paper";
// Import the DefaultTheme from '@react-navigation/native'
import { DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
// Import the MD3LightTheme from 'react-native-paper'
import {
    MD3LightTheme,
} from 'react-native-paper';

// Use the adaptNavigationTheme function to create a LightTheme based on the NavigationDefaultTheme
const { LightTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme
});

// Create a custom theme for Egypt (EG_THEME) by merging MD3LightTheme and LightTheme
const EG_THEME = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...LightTheme.colors,
        ...MD3LightTheme.colors,
        primary: '#3498db', // Blue color for Egypt
        secondary: '#FFFFFF', // Secondary color
        accent: '#e74c3c', // Accent color
    },
};

// Export the custom theme for use in the application
export default EG_THEME;
