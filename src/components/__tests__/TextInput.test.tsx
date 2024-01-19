import React from 'react';
import { render, fireEvent } from '../../test-utils';
import TextInput from '../TextInput';
jest.useFakeTimers();

const mockProps = {
  label: 'Username',
  value: '',
  onChangeText: jest.fn(),
};

describe('TextInput', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(<TextInput {...mockProps} />);
    
    // Check if the component renders with the provided label
    expect(getByTestId('text-input-outlined-label-background')).toBeDefined();
  });

  it('calls onChangeText when text changes', () => {
    const { getByTestId } = render(<TextInput {...mockProps} />);
    const input = getByTestId('text-input-outlined-label-background');

    // Simulate text input change
    fireEvent.changeText(input, 'New Text');

    // Check if onChangeText is called with the correct value
    expect(mockProps.onChangeText).toHaveBeenCalledWith('New Text');
  });

  it('displays error text when provided', () => {
    const { getByText } = render(<TextInput {...mockProps} errorText="This is an error" />);
    
    // Check if the error text is displayed
    expect(getByText('This is an error')).toBeDefined();
  });
});