# Installation instructions

## Prerequisites

- [node.js](http://nodejs.org/download/)
- [npm](https://www.npmjs.com/)
- [bower](http://bower.io/)
- [grunt](http://gruntjs.com/getting-started)
- [karma](https://www.npmjs.com/)

## npm install

First install the build system Grunt. Running the following command...

``` sh
npm install
```

...installs all Grunt dependencies using the node package manager (npm). The file `packages.json` defines which packages are installed by npm. By default the packages are installed to `node_modules/` (in the current directory).

## bower install

bower install

...instala los componentes necesarios en la app (bootstrap, jquery, json, etc...)

## Usage

``` sh
npm test
grunt test
grunt server
```
