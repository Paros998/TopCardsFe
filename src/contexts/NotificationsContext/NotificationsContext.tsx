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

function filter( data: Notifications, isRead: boolean ) {
  return data.filter( value => value.isRead === isRead );
}

const NotificationsProvider: FC<ProviderProps> = ( { children } ) => {
  const { currentUser } = useCurrentUser();

  const [ readNotifications, setReadNotifications ] = useState<Notifications>( [] );
  const [ unReadNotifications, setUnReadNotifications ] = useState<Notifications>( [] );

  const [ isPending, setIsPending ] = useState( false );
  const [ showCanvas, setShowCanvas ] = useState( false );

  const fetchNotifications = useCallback( async () => {
    if ( !currentUser ) {
      return;
    }
    setIsPending( true );

    try {

      const { data } = await Axios.get<Notifications>( `/notifications/${ currentUser?.userId }` );

      setReadNotifications( filter( data, true ) );
      setUnReadNotifications( filter( data, false ) );

      setIsPending( false );

    } catch ( e: any ) {

      toast.error( e );

    } finally {

      setIsPending( false );

    }

  }, [ currentUser ] );

  const readNotification = async ( notificationId: string ) => {
    if ( !currentUser ) {
      return;
    }

    try {
      await Axios.put( `/notifications/${ notificationId }/read` )
    } catch ( e: any ) {
      toast.error( e );
    } finally {
      await fetchNotifications();
    }
  }

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

  const contextData: Partial<NotificationContextInterface> = {
    readNotification,
    readNotifications,
    unReadNotifications,
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
