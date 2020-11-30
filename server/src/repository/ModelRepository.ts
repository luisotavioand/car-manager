import { Branch } from './../model/Branch';
import db from "./../database/connection";
import { Model } from '../model/Model';

export class ModelRepository {

    public async findAllModels(idBranch: string): Promise<Branch[]> {
        const models = await db('model').select('*').where({branch_id: idBranch}).catch((err) => {
            throw new Error(err.detail);
        });
        return models;
    }

    public async findModelById(idBranch: string): Promise<Branch> {
       throw('method not implement');
    }

    async save(t: Model, idBranch:string): Promise<any> {

        const model = await db('model').insert({
            name: t.name,
            initial_year: t.initial_year,
            final_year: t.final_year,
            branch_id: idBranch
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });

        return model;
    }

    async update(model: Model, idModel: any): Promise<any> {
        await db('model').where({id_model: idModel}).update({
            name: model.name,
            initial_year: model.initial_year,
            final_year: model.final_year,
        }).then(async (resp) => {
            const model = await db('model').select('*').where({ id_model: idModel }).catch((err) => {
                throw new Error(err.detail);
            });
            return model[0];
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }

    async delete(idModel: any): Promise<any> {
        const model = await db('model').select('*').where({id_model: idModel}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return idModel;
    }
}