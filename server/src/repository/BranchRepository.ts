import { Branch } from './../model/Branch';
import db from "./../database/connection";
import HttpException from '../error/HttpException';

export class BranchRepository { 

    public async findAllBranches(): Promise<Branch[]> {
        const branches = await db('branch').select('*').catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return branches;
    }

    public async findBranchById(idBranch: string): Promise<Branch> {

        const branches = await db('branch').select('*').where({ id_branch: idBranch }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        
        if (branches.length > 0) {
            return branches[0];
        } else {
            throw new HttpException(404,'Branch not found',`Cannot find branch with id_branch:${idBranch}`);
        }
    }

    async save(t: Branch): Promise<any> {

        const branch = await db('branch').insert({
            name: t.name,
            country: t.country,
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return branch;
    }

    async update(branch: Branch, idBranch: any): Promise<any> {

        await this.findBranchById(idBranch);

        const organization = await db('branch').where({id_branch: idBranch}).update({
            name: branch.name,
            country: branch.country,
        }).then(async (resp) => {
            const organizations = await db('branch').select('*').where({ id_branch: idBranch }).catch((err) => {
                throw new Error(err.sqlMessage);
            });
            return organizations[0];
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
    }

    async delete(idBranch: any): Promise<any> {

        await this.findBranchById(idBranch);
        
        const branch = await db('branch').select('*').where({id_branch: idBranch}).del().catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return branch;
    }
}