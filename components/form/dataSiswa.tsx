import React from "react";
import {
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  Box,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { FormikErrors } from "formik";
import { FormSchemaI } from "./FormSchema";
import grades from "data/grades";
import dataSiswa, { SlotDataI } from "data/mainDatas";

export default function DataSiswa({
  errors,
  getFieldProps,
  setFieldValue,
  grade,
  namaLengkapSiswa,
}: {
  errors: FormikErrors<FormSchemaI>;
  getFieldProps: (input: string) => any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<FormSchemaI>> | Promise<void>;
  grade: number;
  namaLengkapSiswa: string;
  levelSiswa: number;
}) {
  const [daftarSiswa, setDaftarSiswa] = React.useState<Array<SlotDataI>>([]);
  const [gender, setGender] = React.useState<"m" | "f">("m");
  const [fetchingSiswa, setFetchingSiswa] = React.useState<boolean>(false);

  const gradeOptions = grades.map((option) => {
    return {
      firstLetter: option <= 6 ? "MI" : "MTS",
      value: option,
    };
  });
  const daftarSiswaOptions = daftarSiswa.map((option) => {
    return {
      firstLetter: option.gender == "m" ? "Male" : "Female",
      value: option.lengkap,
    };
  });

  React.useEffect(() => {
    setFetchingSiswa(true);
    setDaftarSiswa(dataSiswa.filter((siswa) => siswa.level == grade));
    setFetchingSiswa(false);
  }, [grade]);

  return (
    <>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <Typography
          style={{
            color: errors.statusPendamping ? "#E2403D" : "#696F79",
            fontSize: "16px",
          }}
        >
          Level Siswa*
        </Typography>
        <Autocomplete
          fullWidth
          id="levelSiswa"
          options={gradeOptions}
          groupBy={(option) => option.firstLetter}
          // @ts-ignore
          getOptionLabel={(option) => option.value}
          sx={{ mt: 1 }}
          value={{
            firstLetter: String(grade),
            value: grade,
          }}
          onChange={(_event, value) => {
            if (grade != value?.value) {
              setFieldValue("namaLengkapSiswa", "");
              setFieldValue("levelSiswa", value?.value);
            }
          }}
          renderInput={(params) => (
            <TextField placeholder="Level" {...params} />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.value}
            </Box>
          )}
        />
        <FormHelperText sx={{ color: "#E2403D" }}>
          {errors.statusPendamping}
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <Typography
          style={{
            color: errors.namaLengkapSiswa ? "#E2403D" : "#696F79",
            fontSize: "16px",
          }}
        >
          Nama Lengkap Siswa*
        </Typography>
        <Autocomplete
          fullWidth
          id="levelSiswa"
          options={daftarSiswaOptions}
          groupBy={(option) => option.firstLetter}
          // @ts-ignore
          getOptionLabel={(option) => option.value}
          sx={{ mt: 1 }}
          value={{
            firstLetter: gender,
            value: namaLengkapSiswa,
          }}
          onChange={(_event, value) => {
            if (namaLengkapSiswa != value?.value) {
              setFieldValue("namaLengkapSiswa", value?.value);
            }
          }}
          renderInput={(params) => (
            <TextField
              placeholder="Nama Lengkap Siswa"
              {...params}
              error={Boolean(errors.namaLengkapSiswa)}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.value}
            </Box>
          )}
          loading={fetchingSiswa}
        />
        <FormHelperText sx={{ color: "#E2403D" }}>
          {errors.namaLengkapSiswa}
        </FormHelperText>
      </FormControl>
    </>
  );
}
