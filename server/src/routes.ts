import { BranchInput } from './model/BranchInput';
import express from 'express';
import BranchController from './controller/BranchController';
import { BranchRepository } from './repository/BranchRepository';
import { validationMiddleware } from './error/ValidationMiddleware';
import { ModelInput } from './model/ModelInput';
import ModelController from './controller/ModelController';
import { ModelRepository } from './repository/ModelRepository';

const routes = express.Router();

const branchController = new BranchController(new BranchRepository());
const modelController = new ModelController(new ModelRepository());

routes.get('/branches', branchController.getAll);
routes.get('/branches/:id', branchController.getAll);
routes.post('/branches', validationMiddleware(BranchInput), branchController.create);
routes.put('/branches/:id', validationMiddleware(BranchInput), branchController.update);
routes.delete('/branches/:id', branchController.delete);

routes.get('/branches/:idBranch/models', modelController.getAll);
routes.post('/branches/:idBranch/models', validationMiddleware(ModelInput), modelController.create);
routes.put('/branches/:idBranch/models/:idModel', validationMiddleware(ModelInput), modelController.update);
routes.delete('/branches/:idBranch/models/:idModel', modelController.delete);

export default routes;