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

    async save(branch: Branch): Promise<any> {

        const branchSaved = await db('branch').insert({
            name: branch.name,
            country: branch.country,
        }).then(async (resp) => {
            const data = await this.findBranchById(resp.toString());
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return branchSaved;
    }

    async update(branch: Branch, idBranch: any): Promise<any> {

        await this.findBranchById(idBranch);
        const branchUpdated = await db('branch').where({id_branch: idBranch}).update({
            name: branch.name,
            country: branch.country,
        }).then(async (resp) => {
            const data:any = await this.findBranchById(idBranch);
            return data;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return branchUpdated;
    }

    async delete(idBranch: any): Promise<any> {

        await this.findBranchById(idBranch);
        const branch = await db('branch').select('*').where({id_branch: idBranch}).del().catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return branch;
    }
}