import { render, screen, fireEvent } from '../../test-utils'
import Button from '../Button'


describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Button onPress={() => { }}>Test Button</Button>);

    // Check if the button text is rendered
    const buttonElement = getByText('Test Button');
    expect(buttonElement).toBeTruthy();
  });

  it('handles press event correctly', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button onPress={onPressMock}>Test Button</Button>);

    const buttonElement = getByText('Test Button');

    // Trigger a press event
    fireEvent.press(buttonElement);

    // Check if the onPress function has been called
    expect(onPressMock).toHaveBeenCalled();
  });
});