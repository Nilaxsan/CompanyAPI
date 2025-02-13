export interface Admin {
    adminId: number;
    userName: string;
    email: string;
    password: string;
    role: string;

}

export interface AdminLogin{
    email: string;
    password: string;
}