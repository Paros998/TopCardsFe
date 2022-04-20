import * as yup from "yup";

export const RegisterFormValidationSchema = yup.object().shape({
  username: yup.string()
    .required(`Username cannot be empty`).min(6, `Username must have at least 6 symbols`),
  password: yup.string()
    .required(`Password cannot be empty`).min(9, `Password must have at least 9 symbols`),
  email: yup.string()
    .required(`Email cannot be empty`).min(6, `Email must have at least 6 symbols`).email(`This email is incorrect`)
});