import { BranchRepository } from './BranchRepository';
import { Branch } from './../model/Branch';
import db from "./../database/connection";
import { Model } from '../model/Model';
import HttpException from '../error/HttpException';

export class ModelRepository {

    branchRepository: BranchRepository;

    constructor(branchRepository: BranchRepository) {
        this.branchRepository = branchRepository;
    }

    public async findAllModels(idBranch: string): Promise<Model[]> {
        await this.branchRepository.findBranchById(idBranch);
        const models = await db('model').select('*').where({ branch_id: idBranch }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return models;
    }

    public async findModelById(idBranch: string, idModel: string): Promise<Branch> {
        const models = await db('model').select('*').where({ branch_id: idBranch, id_model: idModel}).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        if (models.length > 0) {
            return models[0];
        } else {
            throw new HttpException(404, 'Model not found', `Cannot find model with id_model:${idModel}`);
        }
    }

    async save(model: Model, idBranch: string): Promise<any> {
        await this.branchRepository.findBranchById(idBranch);
        const modelSaved = await db('model').insert({
            name: model.name,
            initial_year: model.initial_year,
            final_year: model.final_year,
            branch_id: idBranch
        }).then(async (resp) => {
            const data = await this.findModelById(idBranch, resp.toString());
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return modelSaved;
    }

    async update(model: Model, idBranch: string, idModel: string): Promise<any> {
        await this.findModelById(idBranch, idModel);
        const modelUpdated:any = await db('model').where({ id_model: idModel }).update({
            name: model.name,
            initial_year: model.initial_year,
            final_year: model.final_year,
        }).then(async (resp) => {
            const data = await this.findModelById(idBranch, idModel);
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return modelUpdated;
    }

    async delete(idBranch: string, idModel: string): Promise<any> {
        await this.findModelById(idBranch, idModel);
        const model = await db('model').select('*').where({ id_model: idModel }).del().catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return model;
    }
}