import { Context, createContext, FC, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { NotificationContextInterface, Notifications } from "../../interfaces/models/NotificationContextInterface";
import { useCurrentUser } from "../UserContext/UserContext";
import { toast } from "react-toastify";
import Axios from "axios";

const NotificationsContext = createContext<any>( undefined );

export const useNotifications = () => useContext( NotificationsContext as Context<NotificationContextInterface> )

interface ProviderProps {
  children: ReactNode;
}

let firstUpdate: boolean = true;

const NotificationsProvider: FC<ProviderProps> = ( { children } ) => {

  const { currentUser } = useCurrentUser();

  const [ notifications, setNotifications ] = useState<Notifications>();
  const [ isPending, setIsPending ] = useState( false );
  const [ showCanvas, setShowCanvas ] = useState( false );

  const fetchNotifications = useCallback( async () => {
    if ( !currentUser ) {
      return;
    }
    setIsPending( true );

    try {

      const { data } = await Axios.get<Notifications>( `/users/${ currentUser?.userId }/notifications` );
      setNotifications( data );
      setIsPending( false );

    } catch ( e: any ) {

      toast.error( e );

    } finally {

      setIsPending( false );

    }

  }, [ currentUser ] );

  const updateNotifications = useCallback( async () => {
    fetchNotifications().catch();
  }, [ fetchNotifications ] );

  useEffect( () => {
    const interval = setInterval( updateNotifications, 20000 );
    return () => clearInterval( interval );
  }, [ updateNotifications, fetchNotifications ] )

  useEffect( () => {
    if ( firstUpdate && currentUser ) {
      fetchNotifications();
      firstUpdate = false;
    }
  }, [ fetchNotifications, currentUser ] )

  const contextData = {
    notifications,
    isPending,
    fetchNotifications,
    showCanvas,
    setShowCanvas
  };

  return (
    <NotificationsContext.Provider value={ contextData }>
      { children }
    </NotificationsContext.Provider>
  );
}

export default NotificationsProvider;
