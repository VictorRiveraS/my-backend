import { Request, Response } from 'express';
import Handler from '../helpers/request.handler';
import service from './auth.service';
import { JWT_SECRET as secret } from '../config/env';
import Jwt from '../helpers/jwt';

class AdminAuthCtrl {
    public async signin(req: Request, res: Response): Promise<void> {
        try {
            const signin = await service.signin(req.body);
            Handler(res, signin[0], signin[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async forgotPassword(req: Request, res: Response): Promise<void> {
        try {
            const response = await service.forgotPassword(req.body.email);
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

    public async resetPassword(req: Request, res: Response): Promise<void> {
        try {
            let { token, email } = req.query;
            email = String(email).replace(' ', '+');
            const isValidToken: boolean = Jwt.verifyJWT({ token: String(token), secret });
            if (!isValidToken) return Handler(res, 401, { error: 'Token expired.' });
            const response = await service.resetPassword(req.body.new_password, String(email));
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new AdminAuthCtrl;