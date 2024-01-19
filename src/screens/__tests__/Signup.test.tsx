import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Register from '../signup';
import { act } from 'react-test-renderer';
import useAdduser from '../../hooks/useAdduser';

jest.useFakeTimers()

const mockAddUser = jest.fn(() => Promise.resolve({ name: "abc" }));
const mockAddUserError = jest.fn(async () => Promise.resolve({ error: "some error" }));
const mockedNavigate = jest.fn()

// Mock necessary modules and dependencies
jest.mock('../../hooks/useAdduser', () => ({
    __esModule: true,
    default: jest.fn(() => ({ addUser: jest.fn(), isLoading: false })),
}));

jest.mock('react-i18next', () => ({
    ...jest.requireActual('react-i18next'),
    useTranslation: () => ({ t: (key) => key }),
}));


jest.mock('react-native-toast-message', () => ({
    show: jest.fn(),
}));


describe('Register', () => {
    afterEach(() => {
        jest.clearAllMocks()
    })
    it('renders the Register component correctly', () => {
        const { getAllByText } = render(<Register navigation={{ navigate: jest.fn() }} />);
        expect(getAllByText('register.labels.username')[0]).toBeDefined();
        expect(getAllByText('register.labels.email')[0]).toBeDefined();
        expect(getAllByText('register.labels.password')[0]).toBeDefined();
    });

    it('calls addUser function when Sign Up button is pressed', async () => {

        // Mock useAddUser hook to return success from addUser function
        (useAdduser as jest.Mock).mockImplementation(() => ({
            addUser: mockAddUser
        }))

        const { getAllByText, getByTestId } = render(<Register navigation={{ navigate: mockedNavigate }} />);
        const submitButton = getByTestId('button')

        //button should be disabled before filling the form
        expect(submitButton).toBeDisabled()

        // Fill in the form fields
        fireEvent.changeText(getAllByText('register.labels.username')[0], 'testUser');
        fireEvent.changeText(getAllByText('register.labels.email')[0], 'test@example.com');
        fireEvent.changeText(getAllByText('register.labels.password')[0], 'testPassword');

        await waitFor(() => {
            //button should be enabled after filling the form
            expect(submitButton).not.toBeDisabled()

            // Trigger Sign Up button press
            act(async () => {
                fireEvent.press(submitButton);
            });

            // expect addUserHook to be called with the correct data
            expect(mockAddUser).toHaveBeenCalledWith(
                expect.objectContaining({
                    country: "UAE",
                    email: "test@example.com",
                    password: "testPassword",
                    username: "testUser",
                }));

            // expect the navigation correctly to the next page
            expect(mockedNavigate).toHaveBeenCalledWith("UserInfo")

            // expect success toast to be displayed correctly
            expect(require('react-native-toast-message').show).toHaveBeenCalledWith(
                expect.objectContaining(
                    {
                        type: "success",
                        text1: "register.toast.success.title",
                        text2: "register.toast.success.subtitle"
                    }
                )
            );
        })

    })

    it('displays error toast message when addUser fails', async () => {
        // Mock useAddUser hook to return an error from addUser function
        (useAdduser as jest.Mock).mockImplementation(() => ({
            addUser: mockAddUserError
        }))

        const { getAllByText, getByText, getByTestId } = render(<Register navigation={{ navigate: jest.fn() }} />);

        const submitButton = getByTestId('button')

        // Fill in the form fields
        fireEvent.changeText(getAllByText('register.labels.username')[0], 'testUser');
        fireEvent.changeText(getAllByText('register.labels.email')[0], 'test@example.com');
        fireEvent.changeText(getAllByText('register.labels.password')[0], 'testPassword');

        // Verify that the error toast message is displayed
        await waitFor(() => {
            // Trigger Sign Up button press
            act(async () => {
                fireEvent.press(submitButton);
            });
            // expect success toast to be displayed correctly
            expect(require('react-native-toast-message').show).toHaveBeenCalledWith(
                expect.objectContaining(
                    {
                        type: "error",
                        text2: "some error",
                        text1: "register.toast.error.title"
                    }
                )
            );
        });
    });
});
