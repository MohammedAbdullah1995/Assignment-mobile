import { renderHook, act } from '@testing-library/react-hooks';
import useAddUser from '../useAdduser';

// Mock the fetch function
global.fetch = jest.fn(() => Promise.resolve({
  json: () => ({ success: true }),
} as any));

const mockPayload = {
  username: 'testUser',
  password: 'testPassword',
  country: 'testCountry',
  email: 'test@example.com',
};

describe('useAddUser', () => {
  it('should add user successfully', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAddUser());

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.addUser(mockPayload as any);
    });

    expect(result.current.isLoading).toBe(true);

    // Wait for the update to finish
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });

  it('should handle error scenario', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAddUser());

    // Mock the fetch function to return a rejected promise
    global.fetch = jest.fn(() => Promise.reject(new Error('Some error')));

    expect(result.current.isLoading).toBe(false);

    act(() => {
      result.current.addUser(mockPayload as any);
    });

    expect(result.current.isLoading).toBe(true);

    // Wait for the update to finish
    await waitForNextUpdate();

    expect(result.current.isLoading).toBe(false);
  });
  
});
