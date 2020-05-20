import './global.scss';
import App from './App.svelte';

const app = new App({
	target: document.body
});

if (window.WebComponents.ready) {
	// polyfills have already been loaded
	loadWebComponents();
} else {
	window.addEventListener('WebComponentsReady', loadWebComponents);
}

async function loadWebComponents() {
	await import('@alaskaairux/ods-button/dist/auro-button');
	await import('@alaskaairux/ods-inputoptions/dist/ods-inputoption');
	await import('@alaskaairux/ods-inputoptions/dist/ods-inputoption-checkbox-group');
	await import('@alaskaairux/ods-toast');
}