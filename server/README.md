<p align="center">
  <img src="./../docs/logo-dark.png" />
</p>

Rest API to manage cars, brands and models.

## :rocket: Features

* Brands CRUD
* Models CRUD
* Cars CRUD
* Login&Auth

## Starting
* Download Dependencies ```git clone https://github.com/luis291099/car-manager.git```
* Configure Database ```npx knex migrate:latest```
* Run seeds ```npx knex seeds:run```
* Run Project ```npm start```
obs: By default, CarManager API runs on port 3333

## REST Architecture
Project architecture at localhost:
### Brand
* Brand list - GET: http://localhost:3000/brands
* Brand get - GET: http://localhost:3000/brands/:id
* Brand insert - POST: http://localhost:3000/brands
* Brand update - PUT: http://localhost:3000/brands/:id
* Brand delete - DELETE: http://localhost:3000/brands/:id
### Model
* Model list - GET: http://localhost:3000/brands/:idBrand/models
* Model get - GET: http://localhost:3000/brands/:idBrand/models/:idModel
* Model insert - POST: http://localhost:3000/brands/:idBrand/models
* Model update - PUT: http://localhost:3000/brands/:idBrand/models/:idModel
* Model delete - DELETE: http://localhost:3000/brands/:idBrand/models/:idModel
### Car
* Car list - GET: http://localhost:3000/cars
* Car get - GET: http://localhost:3000/cars/:idCar
* Car insert - POST: http://localhost:3000/cars
* Car update - PUT: http://localhost:3000/cars/:idCar
* Car delete - DELETE: http://localhost:3000/cars/:idCar

## Status Codes
CarManager returns the following status codes :

| Status Code | Description |
| :--- | :--- |
| 200 | `OK` |
| 201 | `CREATED`|
| 400 | `BAD REQUEST` |
| 401 | `Unauthorized` | 
| 404 | `NOT FOUND` |
| 500 | `INTERNAL SERVER ERROR` |
