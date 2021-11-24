import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("username diperlukan!"),

  password: Yup.string().required("password diperlukan!"),
});

export interface LoginSchemaI {
  username: string;
  password: string;
}
export default LoginSchema;
