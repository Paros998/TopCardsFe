import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {toast} from 'react-toastify';

// It is called raw data, because it's a fetched data
export const useFetchRawData = <T extends unknown>(endpoint: string, params?: any) => {
  const [rawData, setRawData] = useState<T>();
  const [isPending, setIsPending] = useState(false);

  const fetchData = useCallback(async (callbackParams?: any) => {
    setIsPending(true);
    try {
      const { data } = await axios.get<T>(endpoint, { params: callbackParams || params });
      setRawData(data);
    } catch (e) {
      toast.error(`Something went wrong while acquiring data: ${e}`);
    } finally {
      setIsPending(false);
    }
  }, [setIsPending, setRawData, endpoint, params]);

  useEffect(() => {
    fetchData().catch();
  }, [fetchData]);

  return { rawData, fetchData, isPending };
};