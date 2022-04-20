import * as yup from "yup";

export const LoginFormValidationSchema = yup.object().shape({
  username: yup.string()
    .required(`Username cannot be empty`).min(6, `Username must have at least 6 symbols`),
  password: yup.string()
    .required(`Password cannot be empty`).min(9, `Password must have at least 9 symbols`)
});