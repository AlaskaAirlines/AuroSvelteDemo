import './global.scss';
import App from './App.svelte';

const app = new App({
	target: document.body
});

/* Import any web components used here */
import '@alaskaairux/auro-button';
import "@alaskaairux/auro-checkbox";
import "@alaskaairux/auro-checkbox/dist/auro-checkbox-group";
import '@alaskaairux/auro-header';
import '@alaskaairux/auro-input';
import "@alaskaairux/auro-radio";
import "@alaskaairux/auro-radio/dist/auro-radio-group";
