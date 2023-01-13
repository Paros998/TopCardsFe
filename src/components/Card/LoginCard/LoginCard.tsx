import React, { FC } from 'react';
import CardTemplate from "../CardTemplate";
import TextWithDiamond from "../../TextWithDiamon/TextWithDiamond";
import LoginForm from "../../Forms/LoginForm";
import { LoginFormikValues } from "../../../interfaces/formik/LoginFormikValues";
import { Formik } from 'formik';
import { LoginFormikInitialValues } from "../../../constants/InitialValues/LoginFormikInitialValues";
import { LoginFormValidationSchema } from "../../../constants/validators/LoginFormValidationSchema";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from "../../../contexts/UserContext/UserContext";
import { appendUrlSearchParams } from "../../../utils/appendUrlSearchParams";
import Axios from "axios";

interface LoginCardProps {
  className?: string;
}

const LoginCard: FC<LoginCardProps> = ( { className } ) => {

  const navigate = useNavigate();
  const { fetchUser, setIsPending } = useCurrentUser();

  const handleSignIn = async ( values: LoginFormikValues ) => {
    Axios.defaults.baseURL = 'http://localhost:8080';
    const loginParams = appendUrlSearchParams( values );
    try {
      const { headers } = await Axios.post( '/login', loginParams );
      setIsPending( true );

      const accessToken = headers.authorization;
      Axios.defaults.headers.common.Authorization = accessToken;
      localStorage.setItem( "JWT_USER_TOKEN", accessToken );

      const refreshToken = headers[ 'authorization-refresh' ];

      Axios.defaults.headers[ "Authorization-Refresh" ] = refreshToken;
      localStorage.setItem( "JWT_REFRESH_TOKEN", refreshToken );

      Axios.defaults.baseURL = 'http://localhost:8080/api/v1';

      toast.success( "Logged successfully" );

      navigate( '/' );

      await fetchUser();

    } catch ( e: any ) {
      Axios.defaults.baseURL = 'http://localhost:8080/api/v1'
      toast.error( "Username or Password incorrect" );
    }

  }

  return (
    <CardTemplate
      className={ `rounded-card-10 bg-secondary-dark d-flex flex-column align-items-start login-card ${ className }` }>

      <TextWithDiamond
        className={ `h-20 mb-1 ` }
        diamondClassName={ `text-light ms-3` }
        headerClassName={ `fw-light fs-3` }
      >
        Sign In
      </TextWithDiamond>

      <Formik<LoginFormikValues>
        initialValues={ LoginFormikInitialValues }
        onSubmit={ handleSignIn }
        validationSchema={ LoginFormValidationSchema }
      >
        <LoginForm/>
      </Formik>

    </CardTemplate>
  );
};

export default LoginCard;