export interface User extends UserAccount {
  password: string;
}

export interface UserAccount {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date;
}


export enum UserRole {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  USER = 'user'
}