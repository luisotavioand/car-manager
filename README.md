<p align="center">
  <img src="./docs/logo-dark.png" />
</p>

Web application for car management and control. Consists of an Api REST (express + MySQL) and an Angular client.

## Installation
* 1 - Install [Node.js] (https://nodejs.org/en/)(Npm is installed with Node)
* 2 - Install [MySQL] (https://www.mysql.com)(Don't forget to create the database ```carmanager```)
* 3 - Clone CarManager project
```git clone https://github.com/luis291099/car-manager.git```

## API instructions 
```sh
$ npm install
$ npx knex migrate:latest
$ npx knex seed:run
$ npm start
```
> Look in the directory ```server``` for more information

## Client instructions 
```sh
$ npm install
$ ng serve
```
> Look in the directory ```car-manager``` for more information
