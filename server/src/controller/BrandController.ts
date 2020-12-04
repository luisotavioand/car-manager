import { BrandRepository } from '../repository/BrandRepository';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';

export default class BrandController {

    brandRepository: BrandRepository;
    
    constructor(brandRepository: BrandRepository){
        this.brandRepository = brandRepository;
    }

    public get = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                await this.brandRepository.findBrandById(id).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error getting brand', err.detail ||''));
            }
        } else {
            try {
                await this.brandRepository.findAllBrands().then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error getting brands', err.detail ||''));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {
            try {
                await this.brandRepository.save(body).then((data) => {
                    return response.status(201).json(data).send(); 
                });
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating brand', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        const body = request.body;

        if (body && id) {
            try {
                await this.brandRepository.update(body, id).then((data) => {
                        return response.status(200).json(data).send();
                });
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error updating brand', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                const branch = await this.brandRepository.delete(id);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error deleting brand', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}