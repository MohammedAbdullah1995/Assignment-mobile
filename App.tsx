import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { COUNTRY_NAME } from './src/utils/enums';
import getTheme from './src/themes/getTheme';
import ThemeContext from './src/themes/context';
import { PaperProvider } from 'react-native-paper';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './src/config/i18n'
import Appbar from './src/components/Appbar'
import Toast from 'react-native-toast-message';
import Routes from './src/routes/Routes';

export default function App() {
  const [countryName, setCountryName] = React.useState<COUNTRY_NAME>(COUNTRY_NAME.UAE);
  const { t } = useTranslation()

  const toggleTheme = React.useCallback((param: COUNTRY_NAME) => {
    return setCountryName(param);
  }, [countryName]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      countryName,
    }),
    [toggleTheme, countryName]
  );

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeContext.Provider value={preferences}>
        <PaperProvider theme={getTheme(countryName)}>
          <Toast />
          <NavigationContainer theme={getTheme(countryName)}>
          <Appbar />
            <Routes />
          </NavigationContainer>
        </PaperProvider>
      </ThemeContext.Provider>
    </I18nextProvider>
  );
}
