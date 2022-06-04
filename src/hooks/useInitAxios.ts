import Axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCurrentUser } from "../contexts/UserContext/UserContext";


Axios.defaults.baseURL= `http://localhost:8080/api/v1`;

export const useInitAxios = () => {
  const [errorCode, setErrorCode] = useState();
  const { onClearUser } = useCurrentUser();

  const setNewAccessToken = useCallback(async () => {
    try {
      const { headers } = await Axios.get('/auth/refresh-access');
      const accessToken = headers.authorization;
      Axios.defaults.headers.common.Authorization = accessToken;
      localStorage.removeItem("JWT_USER_TOKEN");
      localStorage.setItem("JWT_USER_TOKEN", accessToken);
    } catch (e: any) {
      toast.error(e?.message);
    }
  }, []);

  useEffect(() => {
    Axios.interceptors.response.use( (response) => response, async (error) => {
      const status = error?.response?.status
      if (status === 401) {
        onClearUser();
      } else if (status === 406) {
        await setNewAccessToken();
        window.location.reload();
      } else if ([403, 404].includes(status) && error.response.config.method === 'get') {
        setErrorCode(status);
      }
      return Promise.reject(error);
    });
  }, [onClearUser, setNewAccessToken]);
  return errorCode;
}