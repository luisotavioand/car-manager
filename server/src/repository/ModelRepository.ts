import { BrandRepository } from './BrandRepository';
import { Brand } from '../model/Brand';
import db from "./../database/connection";
import { Model } from '../model/Model';
import HttpException from '../error/HttpException';

export class ModelRepository {

    brandRepository: BrandRepository;

    constructor(brandRepository: BrandRepository) {
        this.brandRepository = brandRepository;
    }

    public async findAllModels(idBrand: string): Promise<Model[]> {
        await this.brandRepository.findBrandById(idBrand);
        const models = await db('model').select('*').where({ brand_id: idBrand }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return models;
    }

    public async findModelById(idBrand: string, idModel: string): Promise<Brand> {
        const models = await db('model').select('*').where({ brand_id: idBrand, id_model: idModel}).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        if (models.length > 0) {
            return models[0];
        } else {
            throw new HttpException(404, 'Model not found', `Cannot find model with id_model:${idModel}`);
        }
    }

    async save(model: Model, idBrand: string): Promise<any> {
        await this.brandRepository.findBrandById(idBrand);
        const modelSaved = await db('model').insert({
            name: model.name,
            initial_year: model.initial_year,
            final_year: model.final_year,
            brand_id: idBrand
        }).then(async (resp) => {
            const data = await this.findModelById(idBrand, resp.toString());
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return modelSaved;
    }

    async update(model: Model, idBrand: string, idModel: string): Promise<any> {
        await this.findModelById(idBrand, idModel);
        const modelUpdated:any = await db('model').where({ id_model: idModel }).update({
            name: model.name,
            initial_year: model.initial_year,
            final_year: model.final_year,
        }).then(async (resp) => {
            const data = await this.findModelById(idBrand, idModel);
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return modelUpdated;
    }

    async delete(idBrand: string, idModel: string): Promise<any> {
        await this.findModelById(idBrand, idModel);
        const model = await db('model').select('*').where({ id_model: idModel }).del().catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return model;
    }
}