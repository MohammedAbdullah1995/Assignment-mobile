// Import necessary React and React Native components, hooks, and styles
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import useSafeStorage from '../../hooks/useSafeStorage';
import { RegistrationPayload } from '../../utils/interfaces';
import { COUNTRY_NAME } from '../../utils/enums';
import { useTranslation } from 'react-i18next';

// Define the UserInfo component
const UserInfo = () => {
    // Access theme and translation functions
    const theme = useTheme();
    const { t } = useTranslation();

    // State to store user data retrieved from secure storage
    const [userData, setUserData] = useState<RegistrationPayload>();

    // Access the getValueFor function from the useSafeStorage hook
    const { getValueFor } = useSafeStorage();

    // Styles for the component
    const styles = StyleSheet.create({
        card: {
            margin: 16,
            elevation: 4, // Adjust the elevation for a shadow effect
            backgroundColor: theme.colors.primary,
        },
        title: {
            fontSize: 24,
            marginBottom: 8,
            color: theme.colors.secondary
        },
        fieldContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 4,
            color: theme.colors.secondary
        },
        fieldLabel: {
            fontWeight: 'bold',
            marginRight: 8,
            color: theme.colors.secondary
        },
        textColor: {
            color: theme.colors.secondary
        }
    });

    // Function to fetch user data from secure storage
    const fetchDataFromStorage = async () => {
        const username = await getValueFor('username');
        const email = await getValueFor('email');
        const country = await getValueFor('country') as COUNTRY_NAME;
        const password = await getValueFor('password');
        
        // Combine the retrieved data into a single object
        const combinedData = { username, email, country, password };
        
        // Update the state with the retrieved user data
        setUserData(combinedData);
    };

    // useEffect hook to fetch user data on component mount
    useEffect(() => {
        fetchDataFromStorage();
    }, []);

    // Return the JSX representing the component
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Title style={styles.title}>{userData?.email}</Title>
                <View style={styles.fieldContainer}>
                    <Paragraph style={styles.fieldLabel}>{t('register.labels.username')}</Paragraph>
                    <Paragraph style={styles.textColor}>{userData?.username}</Paragraph>
                </View>
                <View style={styles.fieldContainer}>
                    <Paragraph style={styles.fieldLabel}>{t('register.labels.password')}</Paragraph>
                    <Paragraph style={styles.textColor}>{userData?.password}</Paragraph>
                </View>
                <View style={styles.fieldContainer}>
                    <Paragraph style={styles.fieldLabel}>{t('register.labels.country')}</Paragraph>
                    <Paragraph style={styles.textColor}>{userData?.country}</Paragraph>
                </View>
            </Card.Content>
        </Card>
    );
};

// Export the UserInfo component
export default UserInfo;
