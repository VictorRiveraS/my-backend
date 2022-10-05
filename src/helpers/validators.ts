import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';
import Handler from "./request.handler";

class RouteValidator {
    public async validate(req: Request, res: Response, next: NextFunction): Promise<any> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return Handler(res, 422, { error: errors.array()[0].msg });
            }
            next();
        } catch (error) {
            Handler(res, 500, error);
        }
    }
}

export default new RouteValidator;