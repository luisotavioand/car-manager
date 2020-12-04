import { Request, Response, NextFunction } from 'express';
import HttpException from '../error/HttpException';
import { ModelRepository } from './../repository/ModelRepository';

export default class ModelController {

    modelRepository: ModelRepository;
    
    constructor(modelRepository: ModelRepository){
        this.modelRepository = modelRepository;
    }

    public get = async(request: Request, response: Response, next: NextFunction) => {

        const { idBrand, idModel } = request.params;

        if (idBrand && idModel) {
            try {
                await this.modelRepository.findModelById(idBrand, idModel).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error getting model', err.detail || ''));
            }
        } else if (idBrand) {
            try {
                await this.modelRepository.findAllModels(idBrand).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error getting models', err.detail || ''));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;
        const { idBrand } = request.params;

        if (body && idBrand) {
            try {
                const branch = await this.modelRepository.save(body, idBrand);
                return response.status(201).json(branch).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating model', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    
    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { idModel, idBrand } = request.params;
        const body = request.body;

        if (body && idModel) {
            try {
                const branch:any = await this.modelRepository.update(body, idBrand, idModel);
                return response.status(200).json(branch);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating model', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { idModel, idBrand } = request.params;

        if (idModel) {
            try {
                await this.modelRepository.delete(idBrand, idModel);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting model', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}