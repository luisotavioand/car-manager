import { User } from "../model/User";
import db from "./../database/connection";
import * as bcrypt from 'bcrypt';

export class UserRepository {

    public async findUserByEmail(email: string): Promise<any> {
        const user = await db('user').select('*').where({ email: email }).catch((err) => {
            throw new Error(err.sqlMessage);
        });
        return user;
    }

    async save(t: User): Promise<any> {
        const passwordHash = await bcrypt.hash(t.password, 8);
        const user = await db('user').insert({
            username: t.username,
            password: passwordHash,
            email: t.email,
        }).then((resp) => {
            return resp;
        }).catch((err) => {
            throw new Error(err.sqlMessage);
        });

        return user;
    }
}