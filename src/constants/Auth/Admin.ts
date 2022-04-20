import {UserModel} from "../../interfaces/models/UserModel";
import {Roles} from "../../interfaces/enums/Roles";
import Avatar from "../../assets/images/user_avatar.png";

export const Admin:UserModel = {
  appUserRole: Roles.RoleAdmin,
  email: "patrykg198@gmail.com",
  password: "hallllllo",
  userId: "12154123123123",
  username: "Paros998Admin",
  avatarFile: Avatar

}