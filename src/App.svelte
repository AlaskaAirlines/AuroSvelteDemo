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

	$: allCities = [];

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

	function handleCombobox({ target }) {
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

	async function getDataFromAPI(event) {
    console.log('GOT HEREEEEEE');

		const apiURL = 'https://apis.test.alaskaair.com/guestServices/citysearch/SearchCities/codeshare/';

    // NEED to fix:  the response 404 on the browser
    let response =   await fetch(`${apiURL + event.target.__displayValue}`);


    // We only want to get the data if there is a response else set the cities to empty array
    if(response.ok){
      allCities = [];
      // convert the response into JSON
      let data = await response.json();

      console.log(data.length);
      console.log(data);

      // Assign all the matched cities into a global variable for later use
      allCities = data.map(obj => {
        const tempCities = { S: obj.S ,N: obj.N, C: obj.C};
        return tempCities;
      });

      console.log(allCities);

      //console.log (values[0]);
    }
    else{
      allCities = [];
    }
  }

	function isFormDataValid(d) {
		const hasfName = d.fName && d.fName.length > 0;
		const haslName = d.lName && d.lName.length > 0;
		const hasFlier = d.flier && typeof d.flier === 'boolean';
		return hasfName && haslName && hasFlier;
	}

	function handleSubmit() {
		console.warn('Form JSON Data:', formData);
		alert(`Form JSON Data: ` + JSON.stringify(formData));
	}

	getDataFromAPI();
</script>

<main>
	<auro-header>JavaScript Web Component Demo</auro-header>
	<form>
		<auro-input label="First Name" id="fName" required={true} on:input={handleInput} bordered></auro-input>
		<auro-input label="Last Name" id="lName" required={true} on:input={handleInput} bordered></auro-input>
		<auro-combobox id="homeAirport" on:auroCombobox-valueSet={handleCombobox}>
			<span slot="label">Home Airport</span>
			<auro-menu>
				<auro-menuoption value="Seattle" id="option-0">Seattle</auro-menuoption>
				<auro-menuoption value="San Diego" id="option-1">San Diego</auro-menuoption>
				<auro-menuoption value="New York City" id="option-2">New York City</auro-menuoption>
				<auro-menuoption value="Miami" id="option-3">Miami</auro-menuoption>
				<auro-menuoption value="Chicago" id="option-4">Chicago</auro-menuoption>
				<auro-menuoption static nomatch>No matching option</auro-menuoption>
			</auro-menu>
		</auro-combobox>
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
	  padding: var(--auro-size-xl);

	  background-color: var(--auro-color-background-lightest);
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
