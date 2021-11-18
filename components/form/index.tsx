import { useEffect } from "react";
import {
  Typography,
  TextField,
  FormControl,
  InputAdornment,
  Select,
  MenuItem,
  FormHelperText,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import FormSchema, { FormSchemaI } from "./FormSchema";
import { useFormik, Form, FormikProvider } from "formik";
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
}: {
  setStep: (input: number) => void;
  currentStep: number;
  setSubmitting: (input: boolean) => void;
}) {
  const formik = useFormik<FormSchemaI>({
    initialValues: {
      namaPendamping: "",
      nomorWa: "",
      statusPendamping: "",
      levelSiswa: Math.floor(Math.random() * 9) + 1,
      namaLengkapSiswa: "",
    },
    validationSchema: FormSchema,
    onSubmit(_values, help) {
      console.log("sdf");
      setTimeout(() => {
        help.setSubmitting(false);
      }, 1000);

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
