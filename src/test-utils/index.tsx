import { render } from '@testing-library/react-native'
import ThemeContext from '../themes/context'
import { I18nextProvider } from 'react-i18next'
import i18n from '../config/i18n'
import '@testing-library/jest-native/extend-expect';

const AllTheProviders = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ toggleTheme: () => {}, countryName: null }}>
      <I18nextProvider i18n={i18n}>
        {children}
      </I18nextProvider>
    </ThemeContext.Provider>
  )
}

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react-native'

// override render method
export { customRender as render }