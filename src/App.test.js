import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

test('renders select button in App', () => {
  const { getByText, getByDisplayValue } = render(<App />);
  const langSelect = getByDisplayValue('Ruby');
  expect(langSelect).toBeInTheDocument();
});

test('renders option buttons in App', () => {
  const { getByText } = render(<App />);
  const rubyOption = getByText('Ruby');
  const jsOption = getByText('JavaScript');

  expect(rubyOption).toBeInTheDocument();
  expect(jsOption).toBeInTheDocument();
});

test('renders regex input in App', () => {
  const { getByTitle } = render(<App />);
  const regex = getByTitle('Regex'); 
  expect(regex).toBeInTheDocument();
  expect(regex.value).toBe('');
});

test('renders options input in App', () => {
  const { getByTitle } = render(<App />);
  const options = getByTitle('Options'); 
  expect(options).toBeInTheDocument();
  expect(options.value).toBe('');
});

test('renders string textarea in App', () => {
  const { getByTitle } = render(<App />);
  const textarea = getByTitle('String'); 
  expect(textarea).toBeInTheDocument();
  expect(textarea.value).toBe('');
});

test('renders sections for matches in App', () => {
  const { getByTitle } = render(<App />);
  const s1 = getByTitle('Match Output'); 
  const s2 = getByTitle('Group Output')
  expect(s1).toBeInTheDocument();
  expect(s2).toBeInTheDocument();
});

test('renders correct placeholder text for sections in App', () => {
  const { getByText } = render(<App />);
  const s1 = getByText('No results to show.'); 
  const s2 = getByText('No group results.');
  expect(s1).toBeInTheDocument();
  expect(s2).toBeInTheDocument();
});