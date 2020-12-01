import { BranchRepository } from './../repository/BranchRepository';
import { Response, Request, NextFunction } from 'express';
import HttpException from '../error/HttpException';

export default class BranchController {

    branchRepository: BranchRepository;
    
    constructor(branchRepository: BranchRepository){
        this.branchRepository = branchRepository;
    }

    public getAll = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                await this.branchRepository.findBranchById(id).then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(err.status || 500, err.message || 'Unexpected error getting branches', err.detail ||''));
            }
        } else {
            try {
                await this.branchRepository.findAllBranches().then((resp) => {
                    return response.status(200).json(resp).send(); 
                });
            } catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error getting branches', err.detail ||''));
            }
        }
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const body = request.body;

        if (body) {

            try {
                const branch = await this.branchRepository.save(body).then((err) => {});
                return response.status(201).json(branch).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating branch', ''));
            }
        }
    }

    public update = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;
        const body = request.body;

        if (body && id) {
            try {
                const branch:any = await this.branchRepository.update(body, id);
                return response.status(200).json(branch);
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error updating branch', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }

    public delete = async(request: Request, response: Response, next: NextFunction) => {

        const { id } = request.params;

        if (id) {
            try {
                const branch = await this.branchRepository.delete(id);
                return response.status(204).send(); 
            }catch(err) {
                next(new HttpException(500, err.message || 'Unexpected error deleting branch', ''));
            }
        } else {
            next(new HttpException(404, 'Method not found', ''));
        }
    }
}