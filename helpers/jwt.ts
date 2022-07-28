import jwt from 'jsonwebtoken';
import { JWT_SECRET as secret } from '../config/env';
import { Request, Response, NextFunction } from 'express';
import { Handlers } from '../helpers/handlers';
import handler from '../helpers/request.handler';
import { verify as _verify } from 'jsonwebtoken';
import { envelope } from './envelop';

interface verifyData {
    token: string | string[] | undefined;
    secret: string | undefined;
}

class Jwt {
    public sign(data: any, expiresIn: string) {
        const token: string = jwt.sign({
            ...data,
        }, secret, { algorithm: 'HS256', expiresIn });
        return token;
    }

    public async verifyToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token: verifyData['token'] = (req.headers.authorization) ? (req.headers.authorization).replace('Bearer ', '') : undefined;
            if (token && secret) {
                const isValid: boolean = Jwt.verifyJWTS({ token, secret });
                if (isValid) return next();
            }
            throw new Error('401');
        } catch (error: any) {
            handler(res, error.message, { message: 'Unnauthorized' });
        }
    }

    public verifyJWT(verifyData: verifyData): boolean {
        try {
            _verify(String(verifyData.token), String(verifyData.secret));
            return true;
        } catch (error) {
            return false;
        }
    }

    public static verifyJWTS(verifyData: verifyData): boolean {
        try {
            _verify(String(verifyData.token), String(verifyData.secret));
            return true;
        } catch (error) {
            return false;
        }
    }

    public async signToken(email: string, id: string) {
        const token: string = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
            data: { email, id }
        }, secret, { algorithm: 'HS256' });
        return Buffer.from(token).toString('base64');
    }

    public decode(token: any) {
        const decoded: any = jwt.decode(token.replace('Bearer ', ''));
        return decoded;
    }

    public async tokenAuth(req: Request, res: Response, next: NextFunction): Promise<void> {
        const data = req.headers.authorization ? req.headers.authorization?.replace('Bearer ', '') : '';
        try {
            jwt.verify(Buffer.from(data, 'base64').toString('utf-8'), secret);
            next();
        } catch (error) {
            const resError = Handlers.errorHandler({ error: 'Unauthorized.', err: error }, 'UNAUTHORIZED');
            res.status(resError.code).json(envelope(resError.data));
        }
    }

    public getUserId(token: any): any {
        try {
            const { id } = this.decode(token);
            if (id) {
                return id;
            }
            return null;
        } catch (error) {
            return error;
        }
    }

    public getProp(token: any, prop: any): any {
        try {
            const decoded = (this.decode(token.replace('Bearer ', '')))[`${prop}`];
            if (decoded) {
                return decoded;
            }
            return null;
        } catch (error) {
            return error;
        }
    }

}

export default new Jwt();