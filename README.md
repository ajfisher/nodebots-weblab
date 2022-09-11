# nodebots-weblab

Run a NodeBots Lab in your Chrome-like browser using web serial API

## Motivation

This repo was designed to allow you to play with code in the browser and
interact with Johnny-Five and an Arduino without needing nodejs etc.

## How to use

### Installation

Clone this repository:

`git clone git@github.com:ajfisher/nodebots-weblab.git`

Install dependencies

`npm install`

### Running

Everything is done with make commands:

* `make install` - Installs all dependencies, sets everything up
* `make run` - Runs local version of the site, sets up web server etc
* `make build` - Builds the target code from /src into /dist
* `make publish` - Publishes the minified script so you can use it in browser

## Browser bots

