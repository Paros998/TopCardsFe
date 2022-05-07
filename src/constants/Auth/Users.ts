import {UserModel} from "../../interfaces/models/UserModel";
import {Customer} from "./Customer";
import {Admin} from "./Admin";
import {Roles} from "../../interfaces/enums/Roles";
import Cat from "../../assets/images/cat2.jpg";

export const Users:UserModel[] = [
  Customer,
  Admin,
  {
    appUserRole: Roles.RoleClient,
    email: "part4@op.pl",
    password: "asagsdgssdf",
    userId: "58585672452352",
    username: "Mar051",
    avatarFile: Cat,
    blocked: true
  }
];