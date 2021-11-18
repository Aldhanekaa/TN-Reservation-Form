import axios from "axios";

import * as React from "react";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { RootStore } from "global/index";

import { useRouter } from "next/router";

import * as yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";

import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Icon,
} from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Link from "@mui/material/Link";
import ms from "ms";

import UserLoginFunc from "utils/userLogin";
import { UserSignUpLoginSuccess } from "global/actions/auth";
import { UserProjectInterface } from "models/userProject";

export default function LoginComponent({
  children,
  finishLoggedIn,
  setSubmitting,
  style,
}: any) {
  const [error, setError] = React.useState<string>("");
  const [, setAuthCookie] = useCookies([
    process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie",
  ]);
  const router = useRouter();

  const dispatch = useDispatch();
  const authState = useSelector((state: RootStore) => state.user);

  let LoginSchema = yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required(),
  });
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      const userLogin = await UserLoginFunc(formik.values);

      // @ts-ignore
      if (userLogin.errors) {
        setError("password or email is incorrect");
      } else {
        setError("");
      }

      if (userLogin.status === "success") {
        const self = await axios.post<
          { userId: string; roleInTechnoNatura: any },
          {
            data: UserProjectInterface;
          }
        >(`/api/register`, {
          userId: userLogin.user._id,
          roleInTechnoNatura: userLogin.user.roleInTechnoNatura,
        });
        dispatch(
          UserSignUpLoginSuccess(userLogin.user, userLogin.token, self.data)
        );
        toast.success("Login Success!");
        if (formik.values.remember) {
          setAuthCookie(
            process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie",
            userLogin.token,
            { path: "/", maxAge: ms("1y") }
          );
        }

        if (
          router.query.app &&
          typeof router.query.app === "string" &&
          router.query.app === "tn-project"
        ) {
          return;
        }
        if (
          router.query.to &&
          typeof router.query.to === "string" &&
          router.query.to.startsWith("/")
        ) {
          router.push(router.query.to);

          return;
        }

        if (!finishLoggedIn) router.push("/");
        else finishLoggedIn();
      }
      // navigate('/dashboard', { replace: true });
    },
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  React.useEffect(() => {
    if (setSubmitting) setSubmitting(isSubmitting);
  }, [isSubmitting]);

  return (
    <Container
      maxWidth="sm"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        ...style,
      }}
    >
      {children}
      <Box sx={{ mb: 2, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          TechnoNatura Project Login
        </Typography>
        <Typography component="p" gutterBottom color="gray">
          To continue please login to your Social TechnoNatura Account
        </Typography>
      </Box>

      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              // eslint-disable-next-line react/no-array-index-key
              fullWidth
              label="Email"
              {...getFieldProps("email")}
              error={Boolean(
                // @ts-ignore
                touched.email && errors.email
              )}
              // @ts-ignore
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              label="Password"
              {...getFieldProps("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon
                        component={
                          showPassword ? VisibilityIcon : VisibilityOffIcon
                        }
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>
          {error && <Typography color="red">{error}</Typography>}
          <LoadingButton
            style={{ width: "100%", marginBottom: "20px", marginTop: "10px" }}
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>

      <Box sx={{ textAlign: "center" }}>
        <Typography component="p" fontSize={12} gutterBottom color="gray">
          By loging in you agree to TechnoNatura Project{" "}
          <Link href="/terms-of-use">Terms of Use</Link> and{" "}
          <Link href="/privacy-policy">Privacy Policy</Link>
        </Typography>
      </Box>
    </Container>
  );
}
