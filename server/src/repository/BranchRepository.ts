import { Branch } from './../model/Branch';
import db from "./../database/connection";

export class BranchRepository {

    public async findAllBranches(): Promise<Branch[]> {
        const branches = await db('branch').select('*').catch((err) => {
            throw new Error(err.detail);
        });
        return branches;
    }

    public async findBranchById(idBranch: string): Promise<Branch> {
        const branch = await db('branch').select('*').where({ id_branch: idBranch }).catch((err) => {
            throw new Error(err.detail);
        });
        return branch[0];
    }

    async save(t: Branch): Promise<any> {

        const branch = await db('branch').insert({
            name: t.name,
            country: t.country,
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.detail);
        });

        return branch;
    }

    async update(branch: Branch, idBranch: any): Promise<any> {
        const organization = await db('branch').where({id_branch: idBranch}).update({
            name: branch.name,
            country: branch.country,
        }).then(async (resp) => {
            const organizations = await db('branch').select('*').where({ id_branch: idBranch }).catch((err) => {
                throw new Error(err.detail);
            });
            return organizations[0];
        }).catch((err) => {
            throw new Error(err.detail);
        });
    }

    async delete(id: any): Promise<any> {
        const branch = await db('branch').select('*').where({id_branch: id}).del().catch((err) => {
            throw new Error(err.detail);
        });
        return branch;
    }
}