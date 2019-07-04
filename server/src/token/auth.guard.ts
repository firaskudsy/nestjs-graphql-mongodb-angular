import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().request;
        const auth = request.headers.authorization;
        if (!auth) {
            return false;
        }
        const token = request.headers.authorization.split(' ')[1];
        if (!token || token === '') {
            // req.isAuth = false;
            return false;
        }

        try {
            const decodedToken = jwt.verify(token, 'mysec');
            return true;
        } catch (error) {
            // req.isAuth = false;
            return false;
        }


    }
}
