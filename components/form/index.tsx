import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Typography,
  TextField,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  FormHelperText,
  Box,
  Stack,
  Button,
  LinearProgress,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import FormSchema, { FormSchemaI } from "./FormSchema";
import { useFormik, Form, FormikProvider } from "formik";
import { isDesktop } from "react-device-detect";
import html2canvas from "html2canvas";
import { setCookies } from "cookies-next";

import QRCodeGenerator from "qrcode";

import FormSteps from "./FormSteps";
import SubmitButton from "./SubmitButton";
import DataSiswa from "./dataSiswa";
import ReserveSeat from "utils/reserveSeat";
import socket from "socket/index";

import { RootStore } from "global/index";
import { useSelector, useDispatch } from "react-redux";
import { UserLoginSuccess } from "global/actions/auth";

import DataMentor from "./dataMentor";

const StyledInputElement = styled(TextField)`
  background: transparent;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.11);
  }
`;

function PrintDiv(div: any) {
  html2canvas(div).then((canvas) => {
    var myImage = canvas.toDataURL();
    downloadURI(myImage, "ADX2021-QRCode.png");
  });
}

function downloadURI(uri: string, name: string) {
  var link = document.createElement("a");

  link.download = name;
  link.href = uri;
  link.click();
  //after creating link you should delete dynamic link
  //clearDynamicLink(link);
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function MainForm({
  setStep,
  currentStep,
  setSubmitting,
  setSuccessSubmitted,
}: {
  setStep: (input: number) => void;
  currentStep: number;
  setSubmitting: (input: boolean) => void;
  setSuccessSubmitted: (input: boolean) => void;
}) {
  const auth = useSelector((state: RootStore) => state.user);

  const dispatch = useDispatch();

  const router = useRouter();
  const [qrCodeImageURL, setQRCodeImageURL] = useState<undefined | string>();
  const formik = useFormik<FormSchemaI>({
    initialValues: {
      // @ts-ignore
      levelSiswa: Math.floor(Math.random() * 9) + 1,
      namaPengunjung: "",
      id: "",
      statusVisitor: "",
    },
    validationSchema: FormSchema,
    async onSubmit(_values, help) {
      // console.log("sdf");

      const success = new Audio(
        "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328818/01%20Hero%20Sounds/hero_decorative-celebration-02_filr7e.wav"
      );
      await success.play();

      setSuccessSubmitted(true);
      setQRCodeImageURL("s");

      help.setSubmitting(false);
      PrintDiv(document.querySelector(".QRCode-Card"));
      dispatch(UserLoginSuccess(_values));
      socket.connect();

      for (const property in _values) {
        // @ts-ignore
        setCookies(property, _values[property]);
      }
      console.log(socket.connected);
      setTimeout(() => {
        router.push("/live");
      }, 1000);

      setSuccessSubmitted(true);
      help.setSubmitting(false);
      return;
    },
  });

  const { errors, values, setFieldValue, isSubmitting, getFieldProps } = formik;
  function previousStep() {
    if (currentStep !== 0) {
      setStep(currentStep - 1);
    }
  }

  function nextStep() {
    if (currentStep !== FormSteps.length) {
      setStep(currentStep + 1);
    }
  }

  useEffect(() => {
    setSubmitting(isSubmitting);
  }, [isSubmitting]);

  if (qrCodeImageURL) {
    return (
      <>
        {isDesktop && (
          <>
            <img
              src="/celebrationOWO.png"
              style={{ position: "absolute", top: 0, left: -30, zIndex: 99 }}
              width="auto"
              height="auto"
            />
            <img
              src="/celebrationUWU.png"
              style={{ position: "absolute", bottom: 0, right: 0, zIndex: 99 }}
              width="auto"
              height="auto"
            />
          </>
        )}

        <Typography
          style={{
            color: "#fff",
            fontSize: "24px",
            fontFamily: "outfitFont",
          }}
        >
          Memuat Halaman...
        </Typography>
        <Typography
          style={{
            color: "#8692A6",
            fontSize: "18px",
            fontFamily: "outfitFont",
            fontWeight: 500,
          }}
        >
          Mohon tunggu halaman untuk memuat..
        </Typography>
        <Box sx={{ width: "100%", mt: 3 }}>
          <LinearProgress
            sx={{
              color:
                "linear-gradient(to right, #EA543F, #EDA525, #6ABD45, #3FA4DC)",
              backgroundColor:
                "linear-gradient(to right, #EA543F, #EDA525, #6ABD45, #3FA4DC)",
            }}
          />
        </Box>
      </>
    );
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        {FormSteps.map(({ step, inputs, label, label_desc }) => {
          if (step !== currentStep) {
            return "";
          }

          // eslint-disable-next-line consistent-return
          return (
            <>
              <Box sx={{ mb: 1 }} key={step}>
                <Typography
                  variant="h3"
                  style={{
                    color: "#fff",
                    fontSize: "30px",
                    fontFamily: "outfitFont",
                  }}
                >
                  {label}
                </Typography>
                <Typography
                  style={{
                    color: "#AAB7CE",
                    fontSize: "18px",
                    fontFamily: "outfitFont",
                    fontWeight: 700,
                  }}
                >
                  {label_desc}
                </Typography>
              </Box>

              {inputs.map(
                ({
                  // eslint-disable-next-line no-shadow
                  label,
                  // eslint-disable-next-line camelcase
                  input_name,
                  show,
                }) => {
                  if (!show) {
                    return "";
                  }
                  return (
                    <FormControl
                      key={input_name}
                      fullWidth
                      sx={{ mt: 3, fontFamily: "outfitFont" }}
                    >
                      <Typography
                        style={{
                          // @ts-ignore
                          color: errors[input_name] ? "#E2403D" : "#696F79",
                          fontSize: "16px",
                          fontFamily: "outfitFont",
                          fontWeight: 500,
                        }}
                      >
                        {label}
                      </Typography>
                      <StyledInputElement
                        id="outlined-textarea"
                        placeholder="Nama"
                        multiline
                        sx={{ mt: 1, width: "100%", fontFamily: "outfitFont" }}
                        {...getFieldProps(input_name)}
                        // @ts-ignore
                        error={Boolean(errors[input_name])}
                        // @ts-ignore
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
                          errors[input_name]
                        }
                      </FormHelperText>
                    </FormControl>
                  );
                }
              )}
            </>
          );
        })}

        {currentStep == 0 && (
          <>
            <FormControl
              fullWidth
              sx={{ mt: 3, fontFamily: "outfitFont", fontWeight: 500 }}
            >
              <Typography
                style={{
                  color: errors.statusVisitor ? "#E2403D" : "#ECEBEE",
                  fontSize: "16px",
                  fontFamily: "outfitFont",
                  fontWeight: 500,
                }}
              >
                Status Pengunjung*
              </Typography>
              <Select
                {...getFieldProps("statusVisitor")}
                name="statusVisitor"
                error={Boolean(errors.statusVisitor)}
                sx={{ mt: 1, fontFamily: "outfitFont", fontWeight: 500 }}
                fullWidth
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                // @ts-ignore
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        style={{
                          color: errors.statusVisitor ? "#E2403D" : "#ECEBEE",
                          fontSize: "16px",
                        }}
                      >
                        Status Pengunjung
                      </Typography>
                    );
                  }
                  return selected;
                }}
              >
                <MenuItem value="Mentor">Mentor</MenuItem>
                <MenuItem value="Orang Tua">Orang Tua</MenuItem>
                <MenuItem value="Saudara">Saudara</MenuItem>
                <MenuItem value="Siswa">Siswa</MenuItem>
                <MenuItem value="Lainnya">Lainnya</MenuItem>
              </Select>
              <FormHelperText
                sx={{
                  color: "#E2403D",
                  fontFamily: "outfitFont",
                  fontWeight: 500,
                }}
              >
                {errors.statusVisitor}
              </FormHelperText>
            </FormControl>
          </>
        )}

        {currentStep == 1 && (
          <>
            {values.statusVisitor == "Mentor" && (
              <DataMentor
                setFieldValue={setFieldValue}
                errors={errors}
                getFieldProps={getFieldProps}
                namaPengunjung={values.namaPengunjung}
                levelSiswa={values.levelSiswa}
                id={values.id}
              />
            )}
            {values.statusVisitor != "Siswa" &&
              values.statusVisitor != "Mentor" && (
                <>
                  <FormControl
                    key={"namaPengunjung"}
                    fullWidth
                    sx={{ mt: 3, fontFamily: "outfitFont" }}
                  >
                    <Typography
                      style={{
                        // @ts-ignore
                        color: errors["namaPengunjung"] ? "#E2403D" : "#696F79",
                        fontSize: "16px",
                        fontFamily: "outfitFont",
                        fontWeight: 500,
                      }}
                    >
                      Nama Pengunjung
                    </Typography>
                    <StyledInputElement
                      id="outlined-textarea"
                      placeholder="Nama"
                      multiline
                      sx={{ mt: 1, width: "100%", fontFamily: "outfitFont" }}
                      {...getFieldProps("namaPengunjung")}
                      // @ts-ignore
                      error={Boolean(errors["namaPengunjung"])}
                      // @ts-ignore
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
                        errors["namaPengunjung"]
                      }
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    sx={{ mt: 3, fontFamily: "outfitFont", fontWeight: 500 }}
                  >
                    <Typography
                      style={{
                        color: errors.statusVisitor ? "#E2403D" : "#ECEBEE",
                        fontSize: "16px",
                        fontFamily: "outfitFont",
                        fontWeight: 500,
                      }}
                    >
                      Gender Pengunjung*
                    </Typography>
                    <Select
                      {...getFieldProps("genderPengunjung")}
                      name="genderPengunjung"
                      error={Boolean(errors.genderPengunjung)}
                      sx={{ mt: 1, fontFamily: "outfitFont", fontWeight: 500 }}
                      fullWidth
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      // @ts-ignore
                      renderValue={(selected) => {
                        if (!selected) {
                          return (
                            <Typography
                              style={{
                                color: errors.genderPengunjung
                                  ? "#E2403D"
                                  : "#ECEBEE",
                                fontSize: "16px",
                              }}
                            >
                              Status Pengunjung
                            </Typography>
                          );
                        }
                        return selected;
                      }}
                    >
                      <MenuItem value="L">Laki-Laki</MenuItem>
                      <MenuItem value="P">Perempuan</MenuItem>
                    </Select>
                    <FormHelperText
                      sx={{
                        color: "#E2403D",
                        fontFamily: "outfitFont",
                        fontWeight: 500,
                      }}
                    >
                      {errors.genderPengunjung}
                    </FormHelperText>
                  </FormControl>
                </>
              )}

            {(values.statusVisitor == "Orang Tua" ||
              values.statusVisitor == "Siswa") && (
              <DataSiswa
                setFieldValue={setFieldValue}
                errors={errors}
                getFieldProps={getFieldProps}
                namaLengkapSiswa={values.namaLengkapSiswa}
                namaPengunjung={values.namaPengunjung}
                levelSiswa={values.levelSiswa}
                id={values.id}
                orangTua={values.statusVisitor == "Orang Tua" ? true : false}
              />
            )}
          </>
        )}

        {/* eslint-disable-next-line no-nested-ternary */}
        {!isSubmitting && currentStep > 0 ? (
          currentStep !== FormSteps.length ? (
            <SubmitButton
              goBack={false}
              formik={formik}
              currentStep={currentStep}
              isSubmitting={isSubmitting}
              nextStep={nextStep}
              previousStep={previousStep}
              steps={FormSteps.length}
            />
          ) : (
            <>
              <Box sx={{ mb: 0 }}>
                <Typography
                  variant="h4"
                  sx={{
                    color: "text.secondary",
                    fontFamily: "outfitFont",
                    fontWeight: 500,
                  }}
                >
                  Verifikasi Data Form
                </Typography>
                <br />

                {["Orang Tua", "Lainnya", "Mentor", "Saudara"].includes(
                  values.statusVisitor
                ) && (
                  <Typography
                    sx={{
                      color: "text.secondary",
                      fontFamily: "outfitFont",
                      fontWeight: 500,
                    }}
                  >
                    Nama Pengunjung : <b>{values.namaPengunjung}</b>
                  </Typography>
                )}
                <Typography
                  sx={{
                    color: "text.secondary",
                    fontFamily: "outfitFont",
                    fontWeight: 500,
                  }}
                >
                  Status Penonton : <b>{values.statusVisitor}</b>
                </Typography>

                {(values.statusVisitor == "Siswa" ||
                  values.statusVisitor == "Orang Tua") && (
                  <>
                    <Divider sx={{ mt: 2, mb: 2 }} />{" "}
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontFamily: "outfitFont",
                        fontWeight: 500,
                      }}
                    >
                      Nama Siswa : <b>{values.namaLengkapSiswa}</b>
                    </Typography>
                    <Typography
                      sx={{
                        color: "text.secondary",
                        fontFamily: "outfitFont",
                        fontWeight: 500,
                      }}
                    >
                      Level Siswa : <b>{values.levelSiswa}</b>
                    </Typography>
                  </>
                )}
              </Box>

              <SubmitButton
                goBack={false}
                formik={formik}
                currentStep={currentStep}
                isSubmitting={isSubmitting}
                nextStep={nextStep}
                previousStep={previousStep}
                steps={FormSteps.length}
              />
            </>
          )
        ) : (
          <SubmitButton
            goBack={false}
            formik={formik}
            currentStep={currentStep}
            isSubmitting={isSubmitting}
            nextStep={nextStep}
            previousStep={previousStep}
            steps={FormSteps.length}
          />
        )}
      </Form>
    </FormikProvider>
  );
}
