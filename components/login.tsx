import FormSchema, { LoginSchemaI } from "./loginSchema";
import { useFormik, Form, FormikProvider } from "formik";
import {
  Container,
  FormHelperText,
  Typography,
  FormControl,
  TextField,
  InputAdornment,
  Stack,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

import { styled } from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const StyledInputElement = styled(TextField)`
  background: transparent;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.11);
  }
`;

export default function Login({
  setLoggedIn,
}: {
  setLoggedIn: (input: boolean) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<LoginSchemaI>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: FormSchema,
    async onSubmit(_values, help) {
      if (
        ["aldhaneka", "admin.adx2021"].includes(_values.username) &&
        ["adx2021.admin"].includes(_values.password)
      ) {
        const success = new Audio(
          "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328818/03%20Primary%20System%20Sounds/ui_unlock_yateqd.wav"
        );
        await success.play();
        setLoggedIn(true);
      }
    },
  });
  const { errors, values, setFieldValue, isSubmitting, getFieldProps } = formik;
  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Container sx={{ width: "100%", paddingTop: 10 }} maxWidth="sm">
          <Stack direction="row" alignItems="center" justifyContent="center">
            <AdminPanelSettingsIcon
              style={{
                fontSize: "55px",
                fontFamily: "outfitFont",
                fontWeight: 500,
                color: "#fff",
              }}
            />
            <Typography
              style={{
                fontSize: "30px",
                fontFamily: "outfitFont",
                fontWeight: 600,
                color: "#fff",
              }}
            >
              ADX 2021 , Admin Login
            </Typography>
          </Stack>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <Typography
              style={{
                color: errors.username ? "#E2403D" : "#fff",
                fontSize: "16px",
                fontFamily: "outfitFont",
                fontWeight: 500,
              }}
            >
              Username*
            </Typography>
            <StyledInputElement
              fullWidth
              autoComplete="current-password"
              {...getFieldProps("username")}
              sx={{
                mt: 1,
                width: "100%",
                fontFamily: "outfitFont",
                fontWeight: 500,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon
                      style={{
                        fontSize: "25px",
                        fontFamily: "outfitFont",
                        fontWeight: 500,
                      }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            <FormHelperText
              variant="outlined"
              sx={{
                color: "#E2403D",
                fontFamily: "outfitFont",
                fontWeight: 500,
              }}
            >
              {
                // @ts-ignore
                errors["username"]
              }
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 3 }}>
            <Typography
              style={{
                color: errors.password ? "#E2403D" : "#fff",
                fontSize: "16px",
                fontFamily: "outfitFont",
                fontWeight: 500,
              }}
            >
              Password*
            </Typography>

            <StyledInputElement
              fullWidth
              autoComplete="current-password"
              type={showPassword ? "text" : "password"}
              {...getFieldProps("password")}
              sx={{
                mt: 1,
                width: "100%",
                fontFamily: "outfitFont",
                fontWeight: 500,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon
                      style={{
                        fontSize: "25px",
                        fontFamily: "outfitFont",
                        fontWeight: 500,
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <>
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword} edge="end">
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  </>
                ),
              }}
            />

            <FormHelperText
              variant="outlined"
              sx={{
                color: "#E2403D",
                fontFamily: "outfitFont",
                fontWeight: 500,
              }}
            >
              {
                // @ts-ignore
                errors["password"]
              }
            </FormHelperText>
          </FormControl>
          <LoadingButton
            sx={{ color: "white", mt: 3 }}
            loadingPosition="start"
            variant="contained"
            fullWidth
            type="submit"
          >
            Login
          </LoadingButton>
        </Container>
      </Form>
    </FormikProvider>
  );
}
