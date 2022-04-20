import {UserModel} from "../../interfaces/models/UserModel";
import {Roles} from "../../interfaces/enums/Roles";
import Cat from "../../assets/images/cat2.jpg";

export const Customer:UserModel = {
  appUserRole: Roles.RoleClient,
  email: "patrykg198@gmail.com",
  password: "halllllllo",
  userId: "6334551451123",
  username: "Paros998",
  avatarFile: Cat
}