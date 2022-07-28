import User, { IAdminUser } from '../users/users.model';
import { hash } from 'bcryptjs';
import adminAuthService from '../auth/auth.service';

class AdminUsersService {
    public async changePassword(new_password: string, email: string): Promise<any> {
        try {
            const user: IAdminUser = await adminAuthService.existUser(email);
            if (!user) {
                return [404, { error: 'User not exist.' }];
            }
            const hashNewPassword = await hash(new_password, 10);
            await User.findByIdAndUpdate(user._id, { password: hashNewPassword });
            return [201, {
                message: 'Password updated.'
            }];
        } catch (error) {
            return [500, error];
        }
    }
}

export default new AdminUsersService;