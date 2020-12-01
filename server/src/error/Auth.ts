import { Request, Response, NextFunction} from 'express';
import * as jwt from   'jsonwebtoken';

export const Auth = async(request: Request, response: Response, next: NextFunction) => {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({message: "Token is required"});
    }

    const token = authHeader.split(' ');

    try {
        await jwt.verify(token[1], "c09df58e2b1292f65f26057b57ec4139");
        next()
    }catch(err) {
        return response.status(401).json({message: "Token invalid"});
    }
}