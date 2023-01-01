import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

interface UsePostCqrsConfig<T> {
  dataMapper?: ( data: any ) => T;
  cqrsBody: any;
  params?: any;
  errorMessage?: string;
  executeOnce?: boolean;
  notExecute?: boolean;
}

type UsePostCqrsReturnModel<T> = [ T, () => Promise<void>, boolean ];

export const usePostCqrs = <T extends unknown>( endpoint: string, config?: UsePostCqrsConfig<T> ): UsePostCqrsReturnModel<T> => {
  const [ data, setData ] = useState<T>();
  const [ executed, setExecuted ] = useState( false );
  const [ isPending, setIsPending ] = useState( false );

  const { cqrsBody, dataMapper, errorMessage, executeOnce, notExecute, params } = config || {};

  const execute = useCallback( async () => {
    if ( notExecute === true ) {
      return;
    }

    if ( executeOnce ) {
      if ( executed ) {
        return;
      }
      setExecuted( true );
    }

    setIsPending( true );
    try {
      const { data: fetchedData } = await Axios.post<T>( endpoint, cqrsBody, { params } );
      const resultData = dataMapper?.( fetchedData ) || fetchedData;
      setData( resultData );
    } catch ( e ) {
      toast.error( errorMessage ? errorMessage : "Couldn't execute query/command" );
    } finally {
      setIsPending( false );
    }
  }, [ setData, dataMapper, endpoint, cqrsBody, params, errorMessage, notExecute, executed, executeOnce ] );

  useEffect( () => {
    execute().catch();
  }, [ execute ] );

  return [ data as T, execute, isPending ];
};