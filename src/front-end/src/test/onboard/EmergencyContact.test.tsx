import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import EmergencyContact from '../../components/onboard/EmergencyContact';

// const mock = new MockAdapter(axios);

describe('CreatePage', () => {
  it('renders correctly', () => {
    render(<EmergencyContact />);
    // find a button with text "Add Emergency Contact"
    expect(screen.getByText('Add Emergency Contact')).toBeInTheDocument();
    expect(screen.getByText('Phone Number')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Relationship')).toBeInTheDocument();
  });
});
