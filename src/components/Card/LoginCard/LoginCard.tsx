import React, {FC} from 'react';
import CardTemplate from "../CardTemplate";
import TextWithDiamond from "../../TextWithDiamon/TextWithDiamond";
import LoginForm from "../../Forms/LoginForm";
import {LoginFormikValues} from "../../../interfaces/formik/LoginFormikValues";
import {Formik} from 'formik';
import {LoginFormikInitialValues} from "../../../constants/InitialValues/LoginFormikInitialValues";
import {LoginFormValidationSchema} from "../../../constants/validators/LoginFormValidationSchema";
import {Users} from "../../../constants/Auth/Users";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import {useNavigate} from 'react-router-dom';
import {useCurrentUser} from "../../../contexts/UserContext/CurrentUserContext";

interface LoginCardProps {
  className?: string;
}

const LoginCard: FC<LoginCardProps> = ({className}) => {

  const navigate = useNavigate();
  const {fetchUser} = useCurrentUser();

  const handleSubmit = async (values: LoginFormikValues) => {

    let user = Users.find(value => value.username === values.username);

    if (user === undefined) {
      toast.error(`User with given username not found`);
      return;
    }

    if (user.password !== values.password) {
      toast.error(`Password is incorrect. Access Denied!`);
      return;
    }

    toast.success(`👍 Login Successful`);

    const sign = require('jwt-encode');
    const secret = 'secret';

    const jwtUser = {
      sub: user.username,
      authorities: [
        {
          authority: user.appUserRole
        }
      ],
      userId: user.userId,
      iat: dayjs().toISOString().valueOf(),
      exp: dayjs().add(3, `h`).toISOString().valueOf()
    }

    const token = sign(jwtUser, secret);

    localStorage.setItem(`JWT_USER_TOKEN`, token);

    await fetchUser();

    navigate(`/`);

  }

  return (
    <CardTemplate className={`bg-dark d-flex flex-column align-items-start login-card ${className}`}>

      <TextWithDiamond
        className={`h-20 mb-1 `}
        diamondClassName={`text-light ms-3`}
        headerClassName={`fw-light fs-3`}
      >
        Sign In
      </TextWithDiamond>

      <Formik<LoginFormikValues>
        initialValues={LoginFormikInitialValues}
        onSubmit={handleSubmit}
        validationSchema={LoginFormValidationSchema}
      >
        <LoginForm/>
      </Formik>

    </CardTemplate>
  );
};

export default LoginCard;