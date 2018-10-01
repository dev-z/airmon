# Airmon
Flight Search Engine (POC)

> The awesome flight search engine

## Pre-requisites ##

* Node JS v6.10+
* npm v6.x.x

## How do I get set up? ##

```bash
# clone repository
git clone https://github.com/dev-z/airmon.git

# cd to project directory
cd airmon

# install dependencies
npm install

# run development version at localhost:3000
npm start
```

## Build Setup ##

* First, follow the instructions given above to set up the project.
* Then follow the following commands:

```bash
# build for production with minification
npm run build
```
Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment ##

`npm run build` creates a `build` directory with a production build of your app. Set up your favorite HTTP server so that a visitor to your site is served `index.html`, and requests to static paths like `/static/js/main.<hash>.js` are served with the contents of the `/static/js/main.<hash>.js` file.

## Static Server ##

For environments using [Node](https://nodejs.org/), the easiest way to handle this would be to install [serve](https://github.com/zeit/serve) and let it handle the rest:

```sh
npm install -g serve
serve -s build
```
The last command shown above will serve your static site on the port **5000**. Like many of [serve](https://github.com/zeit/serve)’s internal settings, the port can be adjusted using the `-p` or `--port` flags.

Run this command to get a full list of the options available:

```sh
serve -h
```

## Linting ##

This project follows eslint configured to use Airbnb's JS/React styleguide.

You should have [ESLint running in your editor](http://eslint.org/docs/user-guide/integrations.html), and it will highlight anything doesn't conform to this project's style guide. This project uses the base Airbnb JS style guide.

> Please do not ignore any linting errors, as they are meant to **help** you and to ensure a clean and simple code base.

To use linting, please ensure that you have all the dev-dependencies installed for this project.
* VS Code - Install the ESLint plugin by Dirk Baeumer.
* Sublime Text 3 - https://github.com/roadhump/SublimeLinter-eslint
* Manually: 
``` bash
npm run lint
```