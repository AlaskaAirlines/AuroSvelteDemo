import { render, screen, waitFor, act } from '@testing-library/svelte';
import App from '../src/App.svelte';
import { querySelectorDeep, querySelectorAllDeep } from 'query-selector-shadow-dom';
import { fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

beforeAll(() => {
	// testing-library uses querySelectorAll to find elements
	// Replace it with a function that will find elements in shadow roots
	document.body.querySelectorAll = querySelectorAllDeep;
	document.body.querySelector = querySelectorDeep;
})

it('displays the header and button is disabled', async () => {
	render(App);
	const heading = await screen.findByRole(
		'heading', 
		{ level: 1, name: 'JavaScript Web Component Demo' });
	expect(heading).toBeInTheDocument();
});

// TODO: needed to fix auro-radio-group reset() method to get tests to run.
// error thrown in console too.
it('disables the button on initial render', async () => {
	render(App);
	// need to await so that the custom element has time to render
	const button = await screen.findByRole('button');
	expect(button).toBeDisabled();
});

it('enables the button when form is valid', async () => {
	render(App);

	const firstNameInput = await screen.findByLabelText('First Name');
	fireEvent.input(firstNameInput, {target: {value: 'Geoff'}});

	// custom elements should have rendered by now, so we don't have to await
	const lastNameInput = screen.getByLabelText('Last Name');
	fireEvent.input(lastNameInput, {target: {value: 'Tester'}});

	const radio = screen.getByLabelText('No');
	userEvent.click(radio);
	expect(radio).toBeChecked();

	const button = screen.getByRole('button');
	await waitFor(() => {
		// wait for element to update
		expect(button).toBeEnabled();
	});

	expect(screen.getByText('Form Data: {"fName":"Geoff","lName":"Tester","flier":false}')).toBeInTheDocument();
});

it('tracks checked destinations', async () => {
	render(App);

	const radio = await screen.findByLabelText('Yes');
	userEvent.click(radio);

	// due to a bug with testing library, we can't use findByLabelText when the label contains a <slot>
	const alaska = await screen.findByRole('checkbox', { name: 'Alaska' });
	userEvent.click(alaska);
	expect(alaska).toBeChecked();

	// wait for Svelte's state updates to be performed
	await act(() => {
		userEvent.click(screen.getByRole('checkbox', { name: 'Hawaii' }));
	});

	expect(screen.getByText('Form Data: {"flier":true,"destinations":["alaska","hawaii"]}')).toBeInTheDocument();
});

