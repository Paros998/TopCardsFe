import { useCallback, useEffect, useState } from "react";
import Axios from "axios";
import { toast } from "react-toastify";

interface UsePostCqrsConfig<T> {
  dataMapper?: ( data: any ) => T;
  cqrsBody: any;
  errorMessage?: string;
}

type UsePostCqrsReturnModel<T> = [ T, () => Promise<void>, boolean ];

export const usePostCqrs = <T extends unknown>( endpoint: string, config?: UsePostCqrsConfig<T> ): UsePostCqrsReturnModel<T> => {
  const [ data, setData ] = useState<T>();
  const [ isPending, setIsPending ] = useState( false );

  const { cqrsBody, dataMapper, errorMessage } = config || {};

  const execute = useCallback( async () => {
    setIsPending( true );
    try {
      const { data: fetchedData } = await Axios.post<T>( endpoint, cqrsBody, {} );
      const resultData = dataMapper?.( fetchedData ) || fetchedData;
      setData( resultData );
    } catch ( e ) {
      toast.error( errorMessage ? errorMessage : "Couldn't execute query/command" );
    } finally {
      setIsPending( false );
    }
  }, [ setData, dataMapper, endpoint, cqrsBody, errorMessage ] );

  useEffect( () => {
    execute().catch();
  }, [ execute ] );

  return [ data as T, execute, isPending ];
};