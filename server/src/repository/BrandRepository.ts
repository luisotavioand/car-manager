import { Brand } from '../model/Brand';
import db from "../database/connection";
import HttpException from '../error/HttpException';

export class BrandRepository { 

    public async findAllBrands(): Promise<Brand[]> {
        const brands = await db('brand').select('*').catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return brands;
    }

    public async findBrandById(idBrand: string): Promise<Brand> {

        const brands = await db('brand').select('*').where({ id_brand: idBrand }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        
        if (brands.length > 0) {
            return brands[0];
        } else {
            throw new HttpException(404,'Brand not found',`Cannot find branch with id_brand: ${idBrand}`);
        }
    }

    async save(brand: Brand): Promise<any> {

        const brandSaved = await db('brand').insert({
            name: brand.name,
            country: brand.country,
        }).then(async (resp) => {
            const data = await this.findBrandById(resp.toString());
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return brandSaved;
    }

    async update(brand: Brand, idBrand: any): Promise<any> {

        await this.findBrandById(idBrand);
        const brandUpdated = await db('brand').where({id_brand: idBrand}).update({
            name: brand.name,
            country: brand.country,
        }).then(async (resp) => {
            const data:any = await this.findBrandById(idBrand);
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return brandUpdated;
    }

    async delete(idBrand: any): Promise<any> {

        await this.findBrandById(idBrand);
        const brand = await db('brand').select('*').where({id_brand: idBrand}).del().catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return brand;
    }
}