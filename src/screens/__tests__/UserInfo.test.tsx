import React from 'react';
import { render, waitFor } from '../../test-utils';
import UserInfo from '../useInfo';
import useSafeStorage from '../../hooks/useSafeStorage';

jest.mock('../../hooks/useSafeStorage', () => ({
    __esModule: true,
    default: jest.fn(() => ({ getValueFor: jest.fn() })),
}));

// Mock data to be returned by useSafeStorage
const mockUserData = {
    username: 'testUser',
    email: 'test@example.com',
    country: 'USA',
    password: 'testPassword',
};

describe('UserInfo Component', () => {
    it('renders user information correctly', async () => {
        // Mock the useSafeStorage hook to return user data
        (useSafeStorage as jest.Mock).mockImplementation(() => ({
            getValueFor: jest.fn(async (key) => mockUserData[key]),
        }));

        const { getByText } = render(<UserInfo />);

        // Wait for the component to fetch and display user data
        await waitFor(() => {
            expect(getByText(mockUserData.email)).toBeTruthy();
            expect(getByText(mockUserData.username)).toBeTruthy();
            expect(getByText(mockUserData.password)).toBeTruthy();
            expect(getByText(mockUserData.country)).toBeTruthy();
        });
    });
});
