<script context="module">
	import Swipe from '@alaskaairux/ods-toast/dist/swipe.js';
	window.Swipe = Swipe;
</script>

<script>
	import Toaster from '@alaskaairux/ods-toast/dist/toaster';
	import '@alaskaairux/ods-toast/dist/toaster.css';

	const toaster = new Toaster();

	let type = 'primary';
	$: message = type === 'primary' ? 'message 1' : 'message 2';

	let options = [
		{
			id: 'cbx1',
			value: 'yes',
			label: 'Yes',
			checked: false
		},
		{
			id: 'cbx2',
			value: 'no',
			label: 'No',
			checked: false
		}
	];

	$: selectedOptions = options.filter(option => option.checked).map(option => option.value);

	function changeType() {
		type = type === 'primary' ? 'secondary' : 'primary';
	}

	function handleChange(e) {
		// Svelte won't let us bind to custom element groups
		// So we have to keep track of the checkbox state ourselves, similar to a controlled component in React
		const { target } = e;

		options.forEach((option, i) => {
			if (option.value === target.value) {
				// direct assignment to array needed to trigger update
				options[i] = { ...option, checked: target.checked };
			}
		})
	}

	function toast() {
		toaster.add(message);
	}
</script>

<main>
	<h1 class="heading--display">Web Component Demo</h1>
	<auro-checkbox-group required>
		<span slot="legend">{`Your Choice: ${JSON.stringify(selectedOptions)}`}</span>
		{#each options as option}
		<auro-checkbox
			id={option.id}
			name="cbxDemo"
			value={option.value}
			checked={option.checked || undefined}
			on:change={handleChange}>
			{option.label}
		</auro-checkbox>
		{/each}
	</auro-checkbox-group>

    <auro-button on:click={toast} secondary={type === 'secondary' || undefined}>Toast</auro-button>
    <auro-button on:click={changeType}>Change Toaster</auro-button>
</main>

<style lang="scss">
	@import './auroUtils.scss';
  main {
    position: relative;
    max-width: 56em;
    background-color: white;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>
