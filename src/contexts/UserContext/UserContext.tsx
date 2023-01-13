import { Context, createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { UserContextInterface } from "../../interfaces/models/UserContextInterface";
import axios from 'axios';
import Axios from 'axios';
import { toast } from "react-toastify";
import { UserModel } from "../../interfaces/models/UserModel";
import jwtDecode from "jwt-decode";
import { JwtUser } from "../../interfaces/JwtUser";
import { Roles } from "../../interfaces/enums/Roles";
import { useNavigate } from "react-router-dom";

const UserContext = createContext<any>( undefined );

export const useCurrentUser = () => useContext( UserContext as Context<UserContextInterface> )

interface ProviderProps {
  children: ReactNode;
}

const CurrentUserProvider: FC<ProviderProps> = ( { children } ) => {

  const navigate = useNavigate();
  const [ currentUser, setCurrentUser ] = useState<UserModel>();
  const [ role, setRole ] = useState<Roles>();
  const [ userPhoto, setUserPhoto ] = useState<string>( '' );
  const [ isPending, setIsPending ] = useState( false );

  const onClearUser = async () => {
    setCurrentUser( undefined );

    await onLogOut()
  };

  const fetchUser = useCallback( async () => {

    setIsPending( true );

    const token = localStorage.getItem( 'JWT_USER_TOKEN' );
    const refreshToken = localStorage.getItem( 'JWT_REFRESH_TOKEN' );

    if ( !token && !refreshToken ) {
      setIsPending( false )
      setCurrentUser( undefined );
    }

    if ( !token ) {
      setIsPending( false )
      return;
    }

    if ( Axios.defaults.headers.common.Authorization === undefined ) {
      Axios.defaults.headers.common.Authorization = token;
    }

    if ( Axios.defaults.headers[ "Authorization-Refresh" ] === undefined ) {
      Axios.defaults.headers[ "Authorization-Refresh" ] = refreshToken;
    }

    const { userId }: JwtUser = jwtDecode( token );

    try {

      const { data } = await Axios.get<UserModel>( `/users/${ userId }` );
      setCurrentUser( data );
      setRole( data.role );
      setIsPending( false );

    } catch ( e: any ) {

      toast.error( e );

    } finally {

      setIsPending( false );

    }
  }, [] );


  const fetchPicture = useCallback( async () => {

    const userId = currentUser?.userId || '';

    try {

      if ( userId ) {
        const { data } = await Axios.get<string>( `/users/avatar/${ userId }` );
        setUserPhoto( data );
      }

    } catch ( e: any ) {

      toast.error( e );

    }
  }, [ currentUser?.userId ] );


  useEffect( () => {
    fetchPicture().catch();
    fetchUser().catch();
  }, [ fetchUser, fetchPicture ] );


  const onLogOut = async () => {

    localStorage.removeItem( 'JWT_USER_TOKEN' );
    localStorage.removeItem( 'JWT_REFRESH_TOKEN' );

    setCurrentUser( undefined );
    setRole( undefined );

    delete axios.defaults.headers.common[ "Authorization" ];
    delete axios.defaults.headers.common[ "Authorization-Refresh" ];

    toast.info( "We hope to see you again soon" );

    navigate( '/' );

    await fetchUser();


  };

  const contextData = {
    currentUser,
    fetchUser,
    isPending,
    setIsPending,
    userPhoto,
    fetchPicture,
    onLogOut,
    onClearUser,
    role
  };

  return (
    <UserContext.Provider value={ contextData }>
      { children }
    </UserContext.Provider>
  );

}

export default CurrentUserProvider;