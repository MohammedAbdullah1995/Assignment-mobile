// Import necessary React and React Native components, hooks, and styles
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Dropdown from '../../components/Dropdown';
import { COUNTRY_NAME } from '../../utils/enums';
import { countryDropDownItems, lanDropDownItems, validateUsername } from '../../utils/constants';
import ThemeContext from '../../themes/context';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import useAdduser from '../../hooks/useAdduser';
import Toast from 'react-native-toast-message';
import useSafeStorage from '../../hooks/useSafeStorage';
import i18n from '../../config/i18n';

// Define the Register component
const Register = ({ navigation }) => {
    // Access theme and translation functions
    const theme = useTheme();
    const { t } = useTranslation();

    // Access theme-related values and functions from the ThemeContext
    const { toggleTheme, countryName } = React.useContext(ThemeContext);

    // Initialize form-related state and functions using react-hook-form
    const { control, handleSubmit, getValues, trigger, formState: { errors, isValid } } = useForm({
        mode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    // Access user registration hook functions
    const { addUser, isLoading } = useAdduser();

    // Access secure storage hook functions
    const { save } = useSafeStorage();

    // Handle the sign-up button press
    const onSignUpPressed = async (data) => {
        const response = await addUser({ ...data, country: countryName });

        // Show success message, save data to secure storage, and navigate to UserInfo screen on successful registration
        if (response?.name) {
            Toast.show({
                type: 'success',
                text1: t('register.toast.success.title'),
                text2: t('register.toast.success.subtitle')
            });
            save({ ...data, country: countryName });
            navigation.navigate('UserInfo');
        } else {
            // Show error message on registration failure
            Toast.show({
                type: 'error',
                text1: t('register.toast.error.title'),
                text2: response?.error
            });
        }
    };

    // Handle country selection in the dropdown
    const onCountrySelect = (value) => {
        toggleTheme(value as COUNTRY_NAME);
        getValues('username') && trigger('username');
    };

    // Handle language selection in the dropdown
    const onLanSelect = (value) => {
        i18n.changeLanguage(value);
    };

    // Styles for the component
    const styles = StyleSheet.create({
        label: {
            color: theme.colors.secondary,
        },
        button: {
            marginTop: 24,
        },
        row: {
            flexDirection: 'row',
            marginTop: 4,
        },
        link: {
            fontWeight: 'bold',
            color: theme.colors.primary,
        },
        container: {
            padding: 20
        },
        activityIndicatorStyle: {
            marginTop: '50%'
        }
    });

    // Return the JSX representing the component
    return (
        isLoading ? <ActivityIndicator style={styles.activityIndicatorStyle} size='large' /> :
            <View style={styles.container}>
                {/* Dropdown for selecting the country */}
                <Dropdown options={countryDropDownItems} onSelect={onCountrySelect} />

                {/* Username input field */}
                <Controller
                    control={control}
                    name='username'
                    rules={{
                        required: { value: true, message: 'validations.required' },
                        validate: (value) => validateUsername(value, countryName)
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label={t('register.labels.username')}
                            returnKeyType="next"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            error={!!errors.username}
                            errorText={t(errors.username?.message)}
                        />
                    )}
                />

                {/* Email input field */}
                <Controller
                    control={control}
                    name='email'
                    rules={{
                        required: { value: true, message: 'validations.required' },
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "validations.email"
                        }
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label={t('register.labels.email')}
                            returnKeyType="next"
                            value={value}
                            onChangeText={onChange}
                            error={!!errors.email}
                            onBlur={onBlur}
                            errorText={t(errors.email?.message)}
                            autoCapitalize="none"
                            textContentType="emailAddress"
                            keyboardType="email-address"
                        />
                    )}
                />

                {/* Password input field */}
                <Controller
                    control={control}
                    name='password'
                    rules={{ required: { value: true, message: 'validations.required' } }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label={t('register.labels.password')}
                            returnKeyType="done"
                            value={value}
                            onChangeText={onChange}
                            error={!!errors.password}
                            errorText={t(errors.password?.message)}
                            secureTextEntry
                        />
                    )}
                />

                {/* Dropdown for selecting the app language */}
                <View style={{ marginTop: 40, zIndex: 500 }}>
                    <Text style={{ marginBottom: 10 }}>{t('register.labels.appLan')}</Text>
                    <Dropdown options={lanDropDownItems} onSelect={onLanSelect} />
                </View>

                {/* Button to trigger the sign-up process */}
                <Button mode="contained" onPress={handleSubmit(onSignUpPressed)} disabled={!isValid} style={styles.button}>
                    {t('register.signUp')}
                </Button>
            </View>
    );
};

// Memoize the component to avoid unnecessary re-renders
export default memo(Register);
