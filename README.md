# Web Component Svelte Demo

![Travis (.org)](https://img.shields.io/travis/alaskaairlines/AuroSvelteDemo?style=for-the-badge) ![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/AlaskaAirlines/AuroSvelteDemo?style=for-the-badge)

An example Svelte project with Auro Components integrated. This app runs and works in all Alaska-supported browsers. Explore the project source to see the Auro Components being used.

Below are instructions for adding Auro compatibility to your project. A familiarity with modern Javascript development is expected.

## Example App API

Depending on your local configuration, this project will work with either `yarn` or `npm`. For the sake of documentation, the commands will default to `npm`.

Within the root directory of the app, you can:

| Command | Description
|---|---
| npm start | Runs the app in the development mode.<br />Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
||Browser sync and linting in the CLI is enabled.
| npm build | Production build in the `build` folder.<br>Optimized, minimized and prepared for deployment
| npm run dev | This will build and watch the code base as well as serve the application on your localhost.


## Setting up a new Svelte project with Auro Web Components

The following steps will let you start using Web Components in your Svelte application across all supported browsers.

### Install

The following command will install
* [auro-button](http://auro.alaskaair.com/components/auro/button)
* [auro-checkbox](https://auro.alaskaair.com/components/auro/checkbox)
* [auro-header](https://auro.alaskaair.com/components/auro/header)
* [auro-input](https://auro.alaskaair.com/components/auro/input)
* [auro-radio](https://auro.alaskaair.com/components/auro/radio)
* [design tokens](http://auro.alaskaair.com/getting-started/developers/design-tokens)
* [focus-visible](https://github.com/WICG/focus-visible)

```js
$ npm install --save-dev @alaskaairux/auro-button @alaskaairux/auro-checkbox @alaskaairux/auro-header @alaskaairux/auro-radio @alaskaairux/design-tokens focus-visible
```

## Importing WC Style Sheets

WC Style Sheets (WCSS) is a responsive, mobile-first collection of styles and tools designed to make it quick and simple for developers to create web experiences using the Auro Design Language.

This resource is built using Sass, [Dart Sass](https://www.npmjs.com/package/sass) is the preferred library for creating a svelte app.

```
$ npm i sass -D
```

### Install WC Style Sheets.

```javascript
$ npm i @alaskaairux/webcorestylesheets
```

After installing `sass`, rename `index.css` to `index.scss` and rename the import in `index.js`.

### Importing the stylesheets

Place global stylesheet imports into `src/global.scss`.

At the top of the document, import basic dependencies:

```scss
@import '~@alaskaairux/design-tokens/dist/tokens/SCSSVariables';
@import "~@alaskaairux/web-core-style-sheets/dist/breakpoints";
@import '~@alaskaairux/web-core-style-sheets/dist/fonts';
@import "~@alaskaairux/web-core-style-sheets/dist/normalize";
@import "~@alaskaairux/web-core-style-sheets/dist/essentials";
@import "~@alaskaairux/web-core-style-sheets/dist/utilityClasses";
```

For more information about these files, be sure to see [the full API](https://alaskaairlines.github.io/WebCoreStyleSheets/), including the various Utility Selectors currently available.

## Icon Library

The Icons package contains standard set of SVG icons that can be used with any web project.

```Javascript
$ npm i @alaskaairux/icons -D
```

Further documentation can be found in the repository's [README](https://auro.alaskaair.com/icons/install) file.

### Add the components

The following is an example of how to add one of the components imported earlier in this document. Following this example, you can add all of the components necessary to achieve your template design.

In `src/main.js` you will need to add imports for all of the components used.

```js
import '@alaskaairux/auro-button';
import "@alaskaairux/auro-checkbox";
import "@alaskaairux/auro-checkbox/dist/auro-checkbox-group";
import '@alaskaairux/auro-header';
import '@alaskaairux/auro-input';
import "@alaskaairux/auro-radio";
import "@alaskaairux/auro-radio/dist/auro-radio-group";
```

In `src/App.svelte`, add a reference to `auro-button` and all other components.

```html
<auro-button>Submit</auro-button>
```

Run the application with `npm start`. The button should render and trigger an alert when clicked.

## Development

This project uses Semantic Release with Conventional Commits. Please be sure to review our [Contributing Guidelines](https://auro.alaskaair.com/getting-started/developers/contributing) for more info.

