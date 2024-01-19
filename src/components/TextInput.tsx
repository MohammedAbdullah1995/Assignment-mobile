import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input, useTheme } from 'react-native-paper';

// Define the Props type, extending the props of the TextInput component and adding an optional errorText
type Props = React.ComponentProps<typeof Input> & { errorText?: string };

// Define the TextInput component
const TextInput = ({ errorText, ...props }: Props) => {
  // Access the current theme using the useTheme hook from react-native-paper
  const theme = useTheme();

  // Create styles using the StyleSheet.create function
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      marginVertical: 12,
    },
    input: {
      backgroundColor: theme.colors.surface,
    },
    error: {
      fontSize: 14,
      color: theme.colors.error,
      paddingHorizontal: 4,
      paddingTop: 4,
    },
  });

  // Render the TextInput component with custom styling
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {/* Display an error message if errorText is provided */}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
};

// Memoize the component to prevent unnecessary renders
export default memo(TextInput);
