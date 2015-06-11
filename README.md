# respoke-brokered-auth-boilerplate

An extremely barebones example of doing brokered auth to connected to Respoke in the browser.

## setup

- `git clone` this repo
- `npm install` to install npm and bower dependencies
- setup your Respoke config prior to starting your app. You can do this one of two ways:
    1. set RESPOKE_APP_ID, RESPOKE_APP_SECRET, and RESPOKE_APP_ID environment variables
    2. copy `config/default.js` to `config/local.js`, and fill in the empty `respoke` properties
- `npm start` to start the server

## customizing
To substitute in your own single page javascript app, simply replace `public/index.html` with your own html! You can use
the code in `public/js/app.js` as an example of performing brokered auth with Respoke. The `bower` package manager is
used to quickly pull in frontend assets that can be included directly into your web app's html page.

## license
[MIT](LICENSE)
