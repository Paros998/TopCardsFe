import {Roles} from "../enums/Roles";

export interface UserModel {
  userId: string;
  username: string;
  password: string;
  email: string;
  appUserRole: Roles;
}