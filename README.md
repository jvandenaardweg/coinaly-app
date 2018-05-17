# Coinaly App
This repository is the frontend of Coinaly. In other words: "the dashboard".

## Development depedencies
In order to run this project locally, you need other project dependencies:

&#x21B3; [coinaly-socket](http://google.nl): Websocket server for realtime Exchange Tickers

&#x21B3; [coinaly-api](http://google.nl): Rest API to talk with Exchange API's and our Postgreql database.

See their GitHub repo's for installation instructions.

## Update icons
1. Download https://github.com/cjdowner/cryptocurrency-icons
2. Put in `static/icons`
3. Make sure manifest file is in `static/icons/manifest.json`, since this is used to determine by the code if there's an icon

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
