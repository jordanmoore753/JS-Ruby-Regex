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
  expect(regex.value).toBe("(regex|string|String)");
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
  expect(textarea.value).toBe("String to match.");
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
  const s1 = getByText('No matching results to show.'); 
  const s2 = getByText('No captured groups.');
  expect(s1).toBeInTheDocument();
  expect(s2).toBeInTheDocument();
});

test('renders clear field button', () => {
  const { getByTitle } = render(<App />);
  const b = getByTitle('Clear Fields');
  expect(b).toBeInTheDocument();
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
  expect(regex.value).toBe("(regex|string|String)");

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
  expect(text.value).toBe("String to match.");

  fireEvent.change(text, { target: { value: 'abc' }});
  expect(getByTitle('String').value).toBe('abc');
});

// clear fields event

test('clear field button clears regex, opt, and textarea', () => {
  const { getByTitle, getByText } = render(<App />);
  const clear = getByTitle('Clear Fields');
  const r = getByTitle('Regex');
  const o = getByTitle('Options');
  const t = getByTitle('String');

  fireEvent.click(clear);
  expect(r.value).toBe('');
  expect(o.value).toBe('');
  expect(t.value).toBe('');
});

test('clear field button clears all with opt added', async () => {
  const { getByTitle, getByText } = render(<App />);
  const clear = getByTitle('Clear Fields');
  const r = getByTitle('Regex');
  const o = getByTitle('Options');
  const t = getByTitle('String');

  await fireEvent.change(o, { target: { value: 'i' }});
  expect(o.value).toBe('i');

  await fireEvent.click(clear);

  expect(r.value).toBe('');
  expect(o.value).toBe('');
  expect(t.value).toBe(''); 
});