import { Roles } from "../enums/Roles";

export interface UserModel {
  userId: string;
  username: string;
  email: string;
  role: Roles;
  isBlocked: boolean;
  avatarFile: string;
  currency?: string;
}