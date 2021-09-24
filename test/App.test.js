import { render, screen, waitFor } from '@testing-library/svelte';
import App from '../src/App.svelte';

it('displays the header', () => {
	render(App);
	const heading = screen.getByText('JavaScript Web Component Demo');
	expect(heading).toBeInTheDocument();
});
