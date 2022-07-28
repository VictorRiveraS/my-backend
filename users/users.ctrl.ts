import { Request, Response } from 'express';
import Handler from '../helpers/request.handler';
import service from '../users/users.service';

class AdminUsersCtrl {

    public async changePassword(req: Request, res: Response): Promise<any> {
        try {
            let { email } = req.query;
            email = String(email).replace(' ', '+');
            const response = await service.changePassword(req.body.new_password, String(email));
            Handler(res, response[0], response[1]);
        } catch (error) {
            Handler(res, 500, error);
        }
    }

}

export default new AdminUsersCtrl;