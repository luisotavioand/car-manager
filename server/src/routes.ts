import { CarInput } from './model/CarInput';
import { CarRepository } from './repository/CarRepository';
import { CarController } from './controller/CarController';
import { Auth } from './error/Auth';
import { UserInput } from './model/UserInput';
import { UserController } from './controller/UserController';
import { BranchInput } from './model/BrandInput';
import express from 'express';
import BrandController from './controller/BrandController';
import { BrandRepository } from './repository/BrandRepository';
import { validationMiddleware } from './error/ValidationMiddleware';
import { ModelInput } from './model/ModelInput';
import ModelController from './controller/ModelController';
import { ModelRepository } from './repository/ModelRepository';
import { UserRepository } from './repository/UserRepository';

const routes = express.Router();

const brandController = new BrandController(new BrandRepository());
const modelController = new ModelController(new ModelRepository(new BrandRepository));
const userController = new UserController(new UserRepository());
const carController = new CarController(new CarRepository());

routes.get('/brands', brandController.get);
routes.get('/brands/:id', brandController.get);
routes.post('/brands', validationMiddleware(BranchInput), brandController.create);
routes.put('/brands/:id', validationMiddleware(BranchInput), brandController.update);
routes.delete('/brands/:id', brandController.delete);

routes.get('/brands/:idBrand/models', modelController.get);
routes.get('/brands/:idBrand/models/:idModel', modelController.get);
routes.post('/brands/:idBrand/models', validationMiddleware(ModelInput), modelController.create);
routes.put('/brands/:idBrand/models/:idModel', validationMiddleware(ModelInput), modelController.update);
routes.delete('/brands/:idBrand/models/:idModel', modelController.delete);

routes.get('/cars', carController.get);
routes.get('/cars/:idCar', carController.get);
routes.post('/cars', validationMiddleware(CarInput), carController.create);
routes.put('/cars/:idCar', validationMiddleware(CarInput), carController.update);
routes.delete('/cars/:idCar', carController.delete);

routes.post('/users',  validationMiddleware(UserInput), userController.create);
routes.post('/session',  userController.login);

export default routes;