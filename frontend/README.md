# Installation instructions

## Prerequisites

- [node.js](http://nodejs.org/download/)
- [npm](https://www.npmjs.com/)
- [grunt-cli](http://gruntjs.com/getting-started)
- [karma-cli](https://www.npmjs.com/package/karma-cli) Instalación: npm install -g karma-cli

## npm install

First install the build system Grunt. Running the following command...

``` sh
npm install
```

...installs all Grunt dependencies using the node package manager (npm). The file `packages.json` defines which packages are installed by npm. By default the packages are installed to `node_modules/` (in the current directory).


## Usage

``` sh
npm test
grunt test
grunt server
```
