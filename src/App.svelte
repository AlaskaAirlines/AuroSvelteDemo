<script>
	import '@alaskaairux/auro-button';
	import "@alaskaairux/auro-checkbox";
	import "@alaskaairux/auro-checkbox/dist/auro-checkbox-group";
	import '@alaskaairux/auro-header';
	import '@alaskaairux/auro-input';
	import "@alaskaairux/auro-radio";
	import "@alaskaairux/auro-radio/dist/auro-radio-group";

	let formData = {};

	const flierOptions = [
		{
			'id': 'flierYes',
			'label': 'Yes',
			'value': true
		},
		{
			'id': 'flierNo',
			'label': 'No',
			'value': false
		}
	];

	const destinationOptions = [
		{
			'label': 'Lower 48',
			'value': 'lower48'
		},
		{
			'label': 'Alaska',
			'value': 'alaska'
		},
		{
			'label': 'Hawaii',
			'value': 'hawaii'
		},
		{
			'label': 'Canada',
			'value': 'canada'
		},
		{
			'label': 'Mexico',
			'value': 'mexico'
		}
	];

	$: disableSubmitButton = !isFormDataValid(formData);

	function handleCheckboxChange({ target }) {
		if (target.checked) {
			formData.destinations = [...formData.destinations, target.value];
		} else {
			formData.destinations = formData.destinations.filter(
				(item) => item !== target.value
			);
		}
	}

	function handleInput({ target }) {
		if (target.value && target.value.length > 0) {
			formData[target.id] = target.value;
		} else {
			delete formData[target.id];
			formData = formData; // necessary to trigger Svelte reactivity
		}
	}

	function handleRadioChange({ target }) {
		formData.flier = target.value;

		if (formData.flier) {
			formData.destinations = [];
		} else {
			delete formData.destinations;
			formData = formData; // necessary to trigger Svelte reactivity
		}
	}

	function isFormDataValid(d) {
		const hasfName = d.fName && d.fName.length > 0;
		const haslName = d.lName && d.lName.length > 0;
		const hasFlier = typeof d.flier === 'boolean';
		return hasfName && haslName && hasFlier;
	}

	function handleSubmit() {
		console.warn('Form JSON Data:', formData);
		alert(`Form JSON Data: ` + JSON.stringify(formData));
	}
</script>

<main>
	<auro-header>JavaScript Web Component Demo</auro-header>
	<form>
		<auro-input label="First Name" id="fName" required={true} on:input={handleInput}></auro-input>
		<auro-input label="Last Name" id="lName" required={true} on:input={handleInput}></auro-input>
		<auro-radio-group id="flierGroup" required={true} on:change={handleRadioChange}>
			<span slot="legend">
				Have you ever flown with Alaska Air?
			</span>
			{#each flierOptions as option}
			<auro-radio
				id={option.id}
				label={option.label}
				value={option.value}>
			</auro-radio>
			{/each}
		</auro-radio-group>
		{#if formData.flier === true}
			<auro-checkbox-group id="destinationGroup" on:change={handleCheckboxChange}>
				<span slot="legend">What destinations have you traveled to?</span>
				{#each destinationOptions as option}
				<auro-checkbox
					id={option.value}
					name={option.value}
					value={option.value}
					checked={formData.destinations.includes(option.value)}>
					{option.label}
				</auro-checkbox>
				{/each}
			</auro-checkbox-group>
		{/if}
	</form>
	<auro-button type="submit" disabled={disableSubmitButton ? true : undefined} on:click={handleSubmit}>Submit</auro-button>
	<div class="formDataWrapper">
		Form Data: {JSON.stringify(formData)}
	</div>
</main>

<style>
	main {
		background-color: var(--auro-color-background-lightest);
		padding: var(--auro-size-xl);
	}

	#flierGroup {
		margin-top: 1rem;
	}

	.formDataWrapper {
		margin-top: var(--auro-size-md);
		padding: var(--auro-size-xs) var(--auro-size-md);
		background: repeating-linear-gradient(45deg,#f3f3f3,#f3f3f3 10px,var(--auro-color-base-white) 0,var(--auro-color-base-white) 20px);
	}
</style>
