export enum UserRole {
  ADMIN = 'ADMIN',
  CAISSIERE = 'CAISSIERE',
  CLIENT = 'CLIENT',
}

export class User {
  id: string;
  email?: string;
  name: string;
  phone?: string;
  password: string;
  username: string;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    name: string,
    password: string,
    username: string,
    phone?: string,
    role?: UserRole,
    email?: string,
  ) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.password = password;
    this.username = username;
    this.role = role || UserRole.CLIENT;
    this.isActive = true;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
