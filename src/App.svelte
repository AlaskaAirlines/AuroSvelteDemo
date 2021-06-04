<script>
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
			'value': 'alaska'
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

	function calcDestinations(e) {
		const destination = e.target.id;
		const state = e.target.checked;

		let d = []

		if (formData.hasOwnProperty('destinations') && formData.destinations.length > 0) {
			d = formData.destinations;
		}

		if (d.includes(destination) && !state) {
			d.splice(d.indexOf(destination), 1);
		} else if (state) {
			d.push(destination);
		}

		if (d.length > 0) {
			formData.destinations = d;
		} else {
			delete formData.destinations;
		}

		document.querySelector('#formData').innerHTML = JSON.stringify(formData);
	}

	function setValue(e) {
		const destintationGroupEl = document.querySelector('#destinationGroup');
		const submitButtonEl = document.querySelector('auro-button[type="submit"]');

		let key = e.target.id;
		if (key.includes('flier')) {
			key = 'flier';
		}

		const value = e.target.value;

		if (value === undefined) {
			delete formData[key];
		} else {
			formData[key] = value;
		}

		const hasfName = formData.hasOwnProperty('fName') && formData.fName.length > 0;
		const haslName = formData.hasOwnProperty('lName') && formData.lName.length > 0;
		const hasFlier = formData.hasOwnProperty('flier') && typeof formData.flier === 'boolean';

		if (hasFlier) {
			if (formData.flier) {
				destintationGroupEl.classList.remove('util_displayHidden');
			} else {
				destintationGroupEl.classList.add('util_displayHidden');
				delete formData.destinations;
			}
		}

		if (hasfName && haslName && hasFlier) {
			submitButtonEl.removeAttribute('disabled');
		} else {
			if (!submitButtonEl.hasAttribute('disabled')) {
				submitButtonEl.setAttribute('disabled', true);
			}
		}

		document.querySelector('#formData').innerHTML = JSON.stringify(formData);
	}

	function handleSubmit() {
		console.warn('Form JSON Data:', formData);
		alert(`Form JSON Data: ` + JSON.stringify(formData));
	}
</script>

<main>
	<auro-header>JavaScript Web Component Demo</auro-header>
	<form>
		<auro-input label="First Name" id="fName" required on:input={setValue}></auro-input>
		<auro-input label="Last Name" id="lName" required on:input={setValue}></auro-input>
		<br />
		<auro-radio-group id="flierGroup" required on:input={setValue}>
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
		<auro-checkbox-group id="destinationGroup" class="util_displayHidden" on:input={calcDestinations}>
			<span slot="legend">What destinations have you traveled to?</span>
			{#each destinationOptions as option}
			<auro-checkbox
				id={option.value}
				name={option.value}
				value={option.value}>
				{option.label}
			</auro-checkbox>
			{/each}
		</auro-checkbox-group>
	</form>
	<auro-button type="submit" disabled on:click={handleSubmit}>Submit</auro-button>
	<div class="formDataWrapper">
		Form Data: <span id="formData"></span>
	</div>
</main>
