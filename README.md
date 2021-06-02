# Svelte Demo

![Travis (.org)](https://img.shields.io/travis/alaskaairlines/AuroSvelteDemo?style=for-the-badge) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/AlaskaAirlines/AuroSvelteDemo?style=for-the-badge)

Interested in starting a new project using Auro and Svelte? This demo project is a complete example that includes basic setup.

To locally run this demo:

```bash
$ git clone https://github.com/AlaskaAirlines/AuroSvelteDemo.git
```

The app runs and works in all [supported browsers](http://auro.alaskaair.com/support/browsersSupport). Please explore the project source to see how the Auro components are being used in a Svelte development environment.

This is a project template for [Svelte](https://svelte.dev) apps. It lives at [https://github.com/sveltejs/template](https://github.com/sveltejs/template).

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

## Example App API

This project is configured to work with `npm`. Within the root directory of the app, you can:

| Command | Description
|---|---
| npm start | Runs the app in the development mode.<br />Open [http://localhost:5000](http://localhost:5000) to view it in the browser.
| npm run build | Production build in the `build` folder.
| npm run dev | Runs dev server with browser sync enabled.

## Setting up a new Svelte project with Auro Web Components

The following steps will let you start using Web Components in your Svelte application across all [supported browsers](https://auro.alaskaair.com/support/browsersSupport).

### Install

The following command will install ods-button, design tokens and focus-visible.

```js
$ npm install --save-dev @alaskaairux/ods-button @alaskaairux/orion-design-tokens focus-visible
```

### Design tokens

Design tokens are a set of pre-defined variables used to manage the design of products.

```shell
auroUtils.scss
@import "../node_modules/@alaskaairux/orion-design-tokens/dist/tokens/SCSSVariables";

global.scss
@import "../node_modules/@alaskaairux/orion-design-tokens/dist/tokens/SassCustomProperties";
@import "../node_modules/@alaskaairux/orion-design-tokens/dist/tokens/SCSSVariables";
@import '../node_modules/@alaskaairux/orion-design-tokens/dist/tokens/TokenProperties';
```

## Icons

Components may have a dependency on Auro icons. The icons package simply needs to be installed and all the references are within the components themselves.

## Development

This project uses Semantic Release with Conventional Commits. Please be sure to review our [Contributing Guidelines](https://auro.alaskaair.com/getting-started/developers/contributing) for more info.
