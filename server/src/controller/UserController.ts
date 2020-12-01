import { Response, Request, NextFunction } from 'express';
import { UserRepository } from '../repository/UserRepository';
import HttpException from '../error/HttpException';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {

    userRepository: UserRepository;
    
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public create = async(request: Request, response: Response, next: NextFunction) => {

        const {password} = request.body;
        const body = request.body;

        if (body) {

            try {
                const user = await this.userRepository.save(body).then((err) => {});
                return response.status(201).json(user).send(); 
            }catch (err) {
                next(new HttpException(500, err.message || 'Unexpected error creating user', ''));
            }
        }
    }

    public login = async(request: Request, response: Response, next: NextFunction) => {

        const {email, password} = request.body;

        try {
            const user = await this.userRepository.findUserByEmail(email).then(async (data) => {
         
                if (data.length === 1) {
                    if(await bcrypt.compare(password, data[0].password)) {
                        
                        const token = jwt.sign({id: data[0].id_user}, "c09df58e2b1292f65f26057b57ec4139", {
                            expiresIn: 2000
                        });

                        const resp = {
                            user: data[0],
                            token: token
                        }
                        return response.json(resp);
                    } else {
                        return response.status(404).json({message: 'User not found'});
                    }
                } else {
                    return response.status(404).json({message: 'User not found'})
                }
            });
        }catch (err) {
            next(new HttpException(500, err.message || 'Unexpected error getting user', ''));
        }

    }

}