export interface User extends UserAccount {
  pseudo: string;
}

export interface UserAccount {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  pseudo: string;
  created_at: Date;
  updated_at: Date;
}
