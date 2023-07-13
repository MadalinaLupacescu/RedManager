// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// import '@testing-library/jest-dom';

// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import App from './App';

// describe('App', () => {
//   it('renders the cell value in black when value is 0', () => {
//     render(<App />);
//     const cellValueElement = screen.getByText('0');
//     expect(cellValueElement).toHaveStyle('color: black');
//   });

//   it('renders the cell value in red when value is greater than 0', () => {
//     render(<App />);
//     const cellValueElement = screen.getByText('5');
//     expect(cellValueElement).toHaveStyle('color: red');
//   });

//   it('updates the cell value and text color when clicking the button', () => {
//     render(<App />);
//     const cellValueElement = screen.getByText('10');
//     const buttonElement = screen.getByText('...');

//     expect(cellValueElement).toHaveStyle('color: red');

//     fireEvent.click(buttonElement);
//     expect(cellValueElement).toHaveTextContent('0');
//     expect(cellValueElement).toHaveStyle('color: black');
//   });
// });

