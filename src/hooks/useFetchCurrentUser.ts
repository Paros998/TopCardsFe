import {useCallback, useEffect, useState} from "react";
import {UserModel} from "../interfaces/models/UserModel";
import {JwtUser} from "../interfaces/JwtUser";
import jwtDecode from "jwt-decode";
import {Users} from "../constants/Auth/Users";

export function useFetchCurrentUser() {

  const [currentUser, setCurrentUser] = useState<UserModel>();
  const [role, setRole] = useState<string | undefined>(undefined);
  const [isPending, setIsPending] = useState<boolean>(false);

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem('JWT_USER_TOKEN');
    if (!token) return;

    const tokenData: JwtUser = jwtDecode(token);
    const role = tokenData?.authorities[0].authority;

    try {
      setIsPending(true);
      const user =  Users.find(value => value.userId === tokenData.userId);

      if(!user)
        return;

      setCurrentUser(user);
      setRole(role);

    } catch (e) {
      console.error(e);
    } finally {
      setIsPending(false);
    }
  }, [setIsPending, setCurrentUser, setRole]);

  useEffect(() => {
      fetchUser().catch();
    }, [fetchUser]
  );

  return {currentUser, setCurrentUser, isPending, setIsPending, fetchUser, role, setRole};
}