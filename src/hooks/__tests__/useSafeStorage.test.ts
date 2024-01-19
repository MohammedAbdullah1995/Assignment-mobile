// Import necessary modules for testing
import * as SecureStore from 'expo-secure-store';
import { renderHook } from '@testing-library/react-hooks';

// Import the custom hook for testing
import useSafeStorage from '../useSafeStorage';

// Mock the Expo SecureStore module
jest.mock('expo-secure-store');

// Describe the test suite for useSafeStorage hook
describe('useSafeStorage', () => {
  // Clear mocks after each test
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test case: Save object properties to SecureStore
  it('should save object properties to SecureStore', async () => {
    // Render the hook for testing
    const { result } = renderHook(() => useSafeStorage());

    // Object to be saved
    const objectToSave = {
      key1: 'value1',
      key2: 'value2',
    };

    // Call the save function of the hook
    await result.current.save(objectToSave);

    // Expect SecureStore.setItemAsync to be called for each key-value pair in the object
    Object.keys(objectToSave).forEach(async (key) => {
      expect(SecureStore.setItemAsync).toHaveBeenCalledWith(key, objectToSave[key]);
    });
  });

  // Test case: Get value for a given key from SecureStore
  it('should get value for a given key from SecureStore', async () => {
    // Render the hook for testing
    const { result } = renderHook(() => useSafeStorage());

    // Key to get from SecureStore
    const keyToGet = 'key1';
    // Stored value for the key
    const storedValue = 'storedValue';

    // Mock SecureStore.getItemAsync to return the stored value
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValueOnce(storedValue);

    // Call the getValueFor function of the hook
    const resultValue = await result.current.getValueFor(keyToGet);

    // Expect the result value to be equal to the stored value
    expect(resultValue).toEqual(storedValue);
    // Expect SecureStore.getItemAsync to be called with the specified key
    expect(SecureStore.getItemAsync).toHaveBeenCalledWith(keyToGet);
  });
});
