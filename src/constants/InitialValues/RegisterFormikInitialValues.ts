import {RegisterFormikValues} from "../../interfaces/formik/RegisterFormikValues";
import UserAvatar from "../../assets/images/user_avatar.png"

export const RegisterFormikInitialValues: RegisterFormikValues = {
  avatarFile: UserAvatar,
  email: "",
  password: "",
  username: ""

}