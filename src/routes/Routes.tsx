// Import the createNativeStackNavigator from @react-navigation/native-stack
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screen components for registration and user info
import Register from '../screens/signup';
import UserInfo from '../screens/useInfo';

// Create a native stack navigator instance
const Stack = createNativeStackNavigator();

// Component defining the navigation routes using the native stack navigator
const Routes = () => {
    return (
        // Stack.Navigator defines the navigation stack with options to hide the header
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Stack.Screen for the registration screen */}
            <Stack.Screen name={'Registration'} component={Register} />
            {/* Stack.Screen for the user info screen */}
            <Stack.Screen name={'UserInfo'} component={UserInfo} />
        </Stack.Navigator>
    );
};

// Export the component defining the navigation routes
export default Routes;
