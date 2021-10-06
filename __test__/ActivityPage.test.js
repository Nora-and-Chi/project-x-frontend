import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ActivityPage from '../components/ActivityPage';
import { TextInput } from 'react-native';

describe('Activity Page ', () => {
  function renderComponent(props) {
    return render(<ActivityPage />);
  }

  const props = {
    values: {
      name: 'Arm work out',
      description: 'Work out my arm every day',
      motivation: 'You need to get those arms right',
      reminder: '08:20',
      selectedDays: ['M', 'W'],
      date: ''
    },
    handleChange: jest.fn()
  };

  it('should show page title', () => {
    const { getByText } = renderComponent();
    expect(getByText(/Setup Activity/i)).toBeTruthy();
  });

  it('should show activity name input with corresponding label and placeholder', () => {
    const { getByTestId } = renderComponent(props);
    expect(getByTestId('activity-name')).toBeTruthy();
    expect(getByTestId('activity-input')).toHaveProp(
      'placeholder',
      'enter activity'
    );
    expect(props.handleChange).toBeTruthy();
  });

  it('should show description input with corresponding label and placeholder', () => {
    const { getByText, getByTestId } = renderComponent(props);
    expect(getByText(/Description/i)).toBeTruthy();
    expect(getByTestId('description-input')).toHaveProp(
      'placeholder',
      'enter description'
    );
  });

  it('should show the days of the week', () => {
    const { getByTestId } = renderComponent({
      ...props,
      daysOfWeek: ['M', 'T', 'W', 'TH', 'F', 'SA', 'SU']
    });
    expect(getByTestId('days-of-week-label')).toHaveTextContent(
      'What days would you practise this activity'
    );
    expect(getByTestId('days-of-week-box')).toBeTruthy();
  });

  it('should render motivation input box', () => {
    const { getByTestId } = renderComponent();
    expect(getByTestId('motivation-label')).toBeTruthy();
    expect(getByTestId('motivation-input')).toHaveProp(
      'placeholder',
      'enter motivation'
    );
  });
});
