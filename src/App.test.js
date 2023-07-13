import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';


test('renders the column definitions correctly', () => {
  render(<App />);

  // Verify the presence of column headers
  expect(screen.getByText('Medications')).toBeInTheDocument();
  expect(screen.getByText('Ambulance1')).toBeInTheDocument();
  expect(screen.getByText('Ambulance2')).toBeInTheDocument();
  expect(screen.getByText('Ambulance3')).toBeInTheDocument();
  expect(screen.getByText('Ambulance4')).toBeInTheDocument();
  expect(screen.getByText('Ambulance5')).toBeInTheDocument();
  expect(screen.getByText('Ambulance6')).toBeInTheDocument();
});







