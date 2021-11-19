import { useEffect, useState } from "react";
import Image from "next/image";
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
} from "@mui/material";
import { styled } from "@mui/system";
import FormSchema, { FormSchemaI } from "./FormSchema";
import { useFormik, Form, FormikProvider } from "formik";
import { isDesktop } from "react-device-detect";

import QRCodeGenerator from "qrcode";

import FormSteps from "./FormSteps";
import SubmitButton from "./SubmitButton";
import DataSiswa from "./dataSiswa";

const StyledInputElement = styled(TextField)`
  background: transparent;
  transition: 0.3s;
  cursor: pointer;
  border-radius: 10px;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.11);
  }
`;

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
  const [qrCodeImageURL, setQRCodeImageURL] = useState<undefined | string>();
  const formik = useFormik<FormSchemaI>({
    initialValues: {
      namaPendamping: "",
      nomorWa: "",
      statusPendamping: "",
      levelSiswa: Math.floor(Math.random() * 9) + 1,
      namaLengkapSiswa: "",
    },
    validationSchema: FormSchema,
    async onSubmit(_values, help) {
      console.log("sdf");

      const qrcode = await QRCodeGenerator.toDataURL("d", {
        color: {
          dark: "#3F5060",
          light: "#fff",
        },
      });

      setTimeout(() => {
        help.setSubmitting(false);
      }, 1000);

      const success = new Audio(
        "https://res.cloudinary.com/dh3vfns2y/video/upload/v1637328818/01%20Hero%20Sounds/hero_decorative-celebration-02_filr7e.wav"
      );
      success.play();

      setSuccessSubmitted(true);
      console.log(setQRCodeImageURL(qrcode));

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
              style={{ position: "absolute", top: 0, left: -30, zIndex: -1 }}
              width="auto"
              height="auto"
            />
            <img
              src="/celebrationUWU.png"
              style={{ position: "absolute", bottom: 0, right: 0, zIndex: -1 }}
              width="auto"
              height="auto"
            />
          </>
        )}

        <Typography
          style={{ color: "#3F5060", fontSize: "30px", fontWeight: 900 }}
        >
          Thank you for submitting in our event!
        </Typography>
        <Typography style={{ color: "#8692A6", fontSize: "18px" }}>
          Thank you for your interest!
        </Typography>
        <Stack direction="row" alignItems="center" sx={{ mt: "10px" }}>
          <Box sx={{ mb: 1 }}>
            <Image src={qrCodeImageURL} width={250} height={250} />
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography style={{ color: "#3F5060", fontSize: "18px" }}>
              Nama Pendamping <br />{" "}
              <b style={{ fontSize: "24px" }}>{values.namaPendamping}</b>
            </Typography>
            <Typography style={{ color: "#647585", fontSize: "18px" }}>
              Nama siswa: {values.namaLengkapSiswa}
            </Typography>
            <Typography
              sx={{ mt: 4 }}
              style={{ color: "#7B8E9F", fontSize: "14px" }}
            >
              Fri, 03 Dec 2021. 09:00 am - 10:00 am
            </Typography>
          </Box>
        </Stack>
        <Typography sx={{ color: "#8692A6", fontSize: "18px" }}>
          Give the QR Code above to Event Staff to be confirmed when you go to
          the event at Fri, 03 Dec 2021. 09:00 am - 10:00 am
        </Typography>
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
                  style={{ color: "#3F5060", fontSize: "30px" }}
                >
                  {label}
                </Typography>
                <Typography style={{ color: "#8692A6", fontSize: "18px" }}>
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
                    <FormControl key={input_name} fullWidth sx={{ mt: 3 }}>
                      <Typography
                        style={{
                          // @ts-ignore
                          color: errors[input_name] ? "#E2403D" : "#696F79",
                          fontSize: "16px",
                        }}
                      >
                        {label}
                      </Typography>
                      <StyledInputElement
                        id="outlined-textarea"
                        placeholder="Nama"
                        multiline
                        sx={{ mt: 1, width: "100%" }}
                        {...getFieldProps(input_name)}
                        // @ts-ignore
                        error={Boolean(errors[input_name])}
                        // @ts-ignore
                      />
                      <FormHelperText
                        variant="outlined"
                        sx={{ color: "#E2403D" }}
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
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Typography
                style={{
                  color: errors.nomorWa ? "#E2403D" : "#696F79",
                  fontSize: "16px",
                }}
              >
                Nomor WA Pendamping*
              </Typography>
              <StyledInputElement
                id="outlined-textarea"
                placeholder="Nomor WA"
                multiline
                {...getFieldProps("nomorWa")}
                // @ts-ignore
                error={Boolean(errors["nomorWa"])}
                sx={{
                  mt: 1,
                  width: "100%",
                }}
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography
                        style={{
                          color: errors.nomorWa ? "#E2403D" : "#8692A6",
                          fontSize: "14px",
                        }}
                      >
                        +62
                      </Typography>
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText variant="outlined" sx={{ color: "#E2403D" }}>
                {
                  // @ts-ignore
                  errors["nomorWa"]
                }
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth sx={{ mt: 3 }}>
              <Typography
                style={{
                  color: errors.statusPendamping ? "#E2403D" : "#696F79",
                  fontSize: "16px",
                }}
              >
                Status Pendamping*
              </Typography>
              <Select
                {...getFieldProps("statusPendamping")}
                name="statusPendamping"
                error={Boolean(errors.statusPendamping)}
                sx={{ mt: 1 }}
                fullWidth
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                // @ts-ignore
                renderValue={(selected) => {
                  if (!selected) {
                    return (
                      <Typography
                        style={{
                          color: errors.statusPendamping
                            ? "#E2403D"
                            : "#696F79",
                          fontSize: "16px",
                        }}
                      >
                        Status Pendamping
                      </Typography>
                    );
                  }
                  return selected;
                }}
              >
                <MenuItem value="orangtua">Orang Tua</MenuItem>
                <MenuItem value="saudara">Saudara</MenuItem>
                <MenuItem value="lainnya">Lainnya</MenuItem>
              </Select>
              <FormHelperText sx={{ color: "#E2403D" }}>
                {errors.statusPendamping}
              </FormHelperText>
            </FormControl>
          </>
        )}
        {currentStep == 1 && (
          <DataSiswa
            setFieldValue={setFieldValue}
            errors={errors}
            getFieldProps={getFieldProps}
            grade={values.levelSiswa}
            namaLengkapSiswa={values.namaLengkapSiswa}
            levelSiswa={values.levelSiswa}
          />
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
                <Typography variant="h4" sx={{ color: "text.secondary" }}>
                  Verifikasi Data Form
                </Typography>

                <br />
                <Typography sx={{ color: "text.secondary" }}>
                  Nama Siswa : <b>{values.namaLengkapSiswa}</b>
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Level Siswa : <b>{values.levelSiswa}</b>
                </Typography>
                <hr style={{ marginTop: "10px", marginBottom: "10px" }} />
                <Typography sx={{ color: "text.secondary" }}>
                  Nama Pendamping : <b>{values.namaPendamping}</b>
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  No WA Pendamping : <b>+62 {values.nomorWa}</b>
                </Typography>
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
