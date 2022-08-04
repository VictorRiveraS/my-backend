import JWT from '../helpers/jwt';
import User, { IAdminUser } from '../users/users.model';
import { compare, hash } from 'bcryptjs';
import { IDecodedAdminUserData, IAdminLoginRequest } from './auth.model';

class AdminAuthService {
    public async signin(body: IAdminLoginRequest): Promise<any> {
        try {
            let { email, password } = body;
            const existUser: IAdminUser = await this.existUser(email);
            if (!existUser) {
                return [400, { error: 'Invalid credentials' }];
            }
            const comparePass: boolean = existUser ? await compare(password, existUser.password) : false;
            if (!comparePass) {
                return [400, { error: 'Invalid credentials' }];
            }
            const sign = await this.signJWT(existUser);
            const token = {
                jwt: sign
            }
            return [201, { token }];
        } catch (error) {
            return [500, { error }];
        }
    }

    public async signJWT(userData: IAdminUser): Promise<string> {
        let encodedData: IDecodedAdminUserData = {
            id: userData._id,
            email: userData.email,
            name: userData.name,
            rol: userData.rol,
            birth_date: userData.birth_date,
            created_at: userData.created_at,
            updated_at: userData.updated_at,
            last_name: userData.last_name,
        };
        const token = JWT.sign(encodedData, '1h');
        return token;
    }

    public async existUser(email: string): Promise<any> {
        try {
            const user: IAdminUser | null = await User.findOne({ email });
            if (user === null || !user.status) {
                return false;
            }
            return user;
        } catch (error) {
            return false;
        }
    }

    public async forgotPassword(email: string): Promise<any> {
        try {
            const existUser: any = await this.existUser(email);
            if (!existUser) {
                return [404, { error: 'The email does not exist or is not registered.' }];
            }
            const token = JWT.sign('reset', '5m');
            /*    const send = new MailHelper(
                   email,
                   'Recupera tu contraseña',
                   `Click here to set a new password: ${URL}/auth/reset?token=${token}&email=${email}`,
                   EMAIL_USER,
                   'reset-password',
                   {
                       "URL_FB": 'www.facebook.com',
                       "URL_INSTAGRAM": 'www.facebook.com',
                       "URL_TWITTER": 'www.facebook.com',
                       "URL_WHATSAPP": 'www.facebook.com',
                       "SITEURL": `${URL}/auth/reset?token=${token}&email=${email}`,
                   }
               );
               const mail_status = await send.sendMailWithTemplate(); */
            return [201, {
                message: 'Reset password mail successfully sent.',
/*                 mail_accepted: mail_status?.accepted?.length > 0 ? true : false
 */            }];
        }
        catch (error) {
            return [500, error];
        }
    }

    public async resetPassword(new_password: string, email: string): Promise<any> {
        try {
            const user: IAdminUser = await this.existUser(email);
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

export default new AdminAuthService;
