import React from 'react';
import { cleanup, render, fireEvent, wait } from '@testing-library/react';
import App from './App';
import ShallowRenderer from 'react-test-renderer/shallow';

afterEach(cleanup);

// default render tests

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

test('renders correct text for sections in App', () => {
  const { getByText } = render(<App />);
  const s1 = getByText('No results to show.'); 
  const s2 = getByText('No group results.');
  expect(s1).toBeInTheDocument();
  expect(s2).toBeInTheDocument();
});

// select option change tests

test('select button values changes to JS', () => {
  const { getByText, getByDisplayValue, queryByDisplayValue } = render(<App />);
  const langSelect = getByDisplayValue('Ruby');
  const e = { target: { value: 'JavaScript' }};

  fireEvent.change(langSelect, e);
  const jsSelect = getByDisplayValue('JavaScript');
  const rbSelect = queryByDisplayValue('Ruby');
  expect(jsSelect).toBeInTheDocument();
  expect(rbSelect).not.toBeInTheDocument();
});

test('select button values changes to JS and back to RB', () => {
  const { getByText, getByDisplayValue, queryByDisplayValue } = render(<App />);
  const langSelect = getByDisplayValue('Ruby');
  const e = { target: { value: 'JavaScript' }};

  fireEvent.change(langSelect, e);
  const jsSelect = getByDisplayValue('JavaScript');
  const rbSelect = queryByDisplayValue('Ruby');

  expect(jsSelect).toBeInTheDocument();
  expect(rbSelect).not.toBeInTheDocument();

  fireEvent.change(jsSelect, { target: { value: 'Ruby' }});

  expect(getByDisplayValue('Ruby')).toBeInTheDocument();
  expect(queryByDisplayValue('JavaScript')).not.toBeInTheDocument();
});

// input change tests

test('regex change is reflected in App', () => {
  const { getByTitle } = render(<App />);
  const regex = getByTitle('Regex'); 
  expect(regex).toBeInTheDocument();
  expect(regex.value).toBe('');

  fireEvent.change(regex, { target: { value: 'abc' }});
  expect(getByTitle('Regex').value).toBe('abc');
});

test('options change is reflected in App', () => {
  const { getByTitle } = render(<App />);
  const options = getByTitle('Options'); 
  expect(options).toBeInTheDocument();
  expect(options.value).toBe('');

  fireEvent.change(options, { target: { value: 'ig' }});
  expect(getByTitle('Options').value).toBe('ig');
});

test('textarea change is reflected in App', () => {
  const { getByTitle } = render(<App />);
  const text = getByTitle('String'); 
  expect(text).toBeInTheDocument();
  expect(text.value).toBe('');

  fireEvent.change(text, { target: { value: 'abc' }});
  expect(getByTitle('String').value).toBe('abc');
});
