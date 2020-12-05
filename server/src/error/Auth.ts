import { Request, Response, NextFunction} from 'express';
import * as jwt from   'jsonwebtoken';

export const Auth = async(request: Request, response: Response, next: NextFunction) => {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.json({message: "Token is required"}).status(401);
    } else {
        const token = authHeader.split(' ');
        try {
            await jwt.verify(token[1], "c09df58e2b1292f65f26057b57ec4139");
            next()
        }catch(err) {
            return response.json({message: "Token invalid"}).status(401);
        }
    }
}