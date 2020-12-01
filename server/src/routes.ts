import { CarInput } from './model/CarInput';
import { CarRepository } from './repository/CarRepository';
import { CarController } from './controller/CarController';
import { Auth } from './error/Auth';
import { UserInput } from './model/UserInput';
import { UserController } from './controller/UserController';
import { BranchInput } from './model/BranchInput';
import express from 'express';
import BranchController from './controller/BranchController';
import { BranchRepository } from './repository/BranchRepository';
import { validationMiddleware } from './error/ValidationMiddleware';
import { ModelInput } from './model/ModelInput';
import ModelController from './controller/ModelController';
import { ModelRepository } from './repository/ModelRepository';
import { UserRepository } from './repository/UserRepository';

const routes = express.Router();

const branchController = new BranchController(new BranchRepository());
const modelController = new ModelController(new ModelRepository(new BranchRepository));
const userController = new UserController(new UserRepository());
const carController = new CarController(new CarRepository());

routes.get('/branches', branchController.getAll);
routes.get('/branches/:id', branchController.getAll);
routes.post('/branches', validationMiddleware(BranchInput), branchController.create);
routes.put('/branches/:id', validationMiddleware(BranchInput), branchController.update);
routes.delete('/branches/:id', branchController.delete);

routes.get('/branches/:idBranch/models', modelController.getAll);
routes.get('/branches/:idBranch/models/:idModel', modelController.getAll);
routes.post('/branches/:idBranch/models', validationMiddleware(ModelInput), modelController.create);
routes.put('/branches/:idBranch/models/:idModel', validationMiddleware(ModelInput), modelController.update);
routes.delete('/branches/:idBranch/models/:idModel', modelController.delete);

routes.get('/users/:idUser/cars', carController.getAll);
routes.post('/users/:idUser/cars', validationMiddleware(CarInput), carController.create);
routes.put('/users/:idUser/cars/:idCar', validationMiddleware(CarInput), carController.update);
routes.delete('/users/:idUser/cars/:idCar', carController.delete);

routes.post('/users',  validationMiddleware(UserInput), userController.create);
routes.post('/session',  userController.login);

export default routes;