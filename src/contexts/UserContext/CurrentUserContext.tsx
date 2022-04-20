import {Context, createContext, ReactNode, useContext} from "react";
import {CurrentUserContextModel} from "../../interfaces/models/CurrentUserContextModel";
import {useFetchCurrentUser} from "../../hooks/useFetchCurrentUser";
import axios from 'axios';
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const CurrentUserContext = createContext<any>(undefined);

export function useCurrentUser() {
  return useContext(CurrentUserContext as Context<CurrentUserContextModel>)
}

interface CurrentUserProviderProps {
  children: ReactNode;
}

function CurrentUserProvider({children}: CurrentUserProviderProps){

  const navigate = useNavigate();
  const data = useFetchCurrentUser();

  const handleLogout = () => {
    localStorage.removeItem('JWT_USER_TOKEN');
    data.setCurrentUser(undefined);
    data.setRole(undefined);
    delete axios.defaults.headers.common["Authorization"];
    toast.info("We hope to see you again soon");
    navigate(`login`);
  };

  return (
    <CurrentUserContext.Provider value={{ ...data, handleLogout}}>
      {children}
    </CurrentUserContext.Provider>
  );

}

export default CurrentUserProvider;