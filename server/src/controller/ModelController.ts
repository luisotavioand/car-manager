import { Request, Response, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { ModelRepository } from './../repository/ModelRepository';

export default class ModelController {

    modelRepository: ModelRepository;
    
    constructor(modelRepository: ModelRepository){
        this.modelRepository = modelRepository;
    }

    public getAll = async(request: Request, response: Response, next: NextFunction) => {

        const { idBranch } = request.params;

        if (idBranch) {
            try {
                await this.modelRepository.findAllModels(idBranch).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error getting models', ''));
            }
        } 
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;
        const { idBranch } = request.params;

        if (body && idBranch) {

            try {
                const branch = await this.modelRepository.save(body, idBranch).then((err) => {});
                return response.status(201).json(branch).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating model', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    
    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { idModel } = request.params;
        const body = request.body;

        if (body && idModel) {
            try {
                const branch:any = await this.modelRepository.update(body, idModel);
                return response.status(200).json(branch);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating model', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { idModel } = request.params;

        if (idModel) {
            try {
                const model = await this.modelRepository.delete(idModel);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting model', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}