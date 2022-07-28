export interface IDecodedAdminUserData {
    id: string | null | undefined;
    email: string;
    name: string;
    last_name: string;
    rol: string;
    birth_date: string;
    created_at: Date;
    updated_at: Date;
}

export interface IAdminLoginRequest {
    email: string;
    password: string;
}