
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IsAuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const authHeader = req.get('Authorization');
        if (!authHeader) {
            return next();
        }
        const token = authHeader.split(' ')[1];

        if (!token || token === '') {
            return next();
        }
        try {
            const decodedToken = jwt.verify(token, 'mysec');
            return next();
        } catch (error) {
            return next();
        }



    }
}
