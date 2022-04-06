import {UserModel} from "./UserModel";

export interface CurrentUserContextModel{
  currentUser? : UserModel;
  fetchUser: <UserModel>() => Promise<void>;
  isPending: boolean;
  handleLogout: () => void;
  role: string;
}