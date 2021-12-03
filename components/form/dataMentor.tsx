import React from "react";
import {
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  Box,
  Autocomplete,
  Divider,
} from "@mui/material";
import { FormikErrors } from "formik";
import { FormSchemaI } from "./FormSchema";
import grades from "data/grades";
import datamentor from "data/dataMentor.json";

export default function DataSiswa({
  errors,
  setFieldValue,
  id,
  levelSiswa,
  namaPengunjung,
}: {
  errors: FormikErrors<FormSchemaI>;
  getFieldProps: (input: string) => any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<FormSchemaI>> | Promise<void>;
  namaPengunjung: string;

  levelSiswa: number;
  id: string;
}) {
  const [daftarSiswa, setDaftarSiswa] = React.useState<
    Array<{
      Nama: string;
      Gender: "L" | "P";
    }>
    // @ts-ignore
  >(datamentor);
  const [gender, setGender] = React.useState<"L" | "P">("L");
  const [fetchingSiswa, setFetchingSiswa] = React.useState<boolean>(false);

  const gradeOptions = grades.map((option) => {
    return {
      firstLetter: option.grade <= 6 ? "MI" : "MTS",
      value: option.grade,
    };
  });

  // const gradeData = (value) =>
  //   grades.findIndex((grade) => grade.grade == value).day;

  const daftarSiswaOptions = daftarSiswa.map((option) => {
    return {
      gender: option.Gender == "L" ? "Laki-Laki" : "Perempuan",
      value: option.Nama,
    };
  });

  return (
    <>
      <Divider sx={{ mt: 2 }} />

      <FormControl fullWidth sx={{ mt: 3 }}>
        <Typography
          style={{
            color: errors.namaPengunjung ? "#E2403D" : "#ECEBEE",
            fontSize: "16px",
            fontFamily: "outfitFont",
            fontWeight: 500,
          }}
        >
          Nama Mentor*
        </Typography>
        <Autocomplete
          fullWidth
          id="namaPengunjung"
          options={daftarSiswaOptions.sort(
            (a, b) => -b.gender.localeCompare(a.gender)
          )}
          groupBy={(option) => option.gender}
          // @ts-ignore
          getOptionLabel={(option) => option.value}
          sx={{ mt: 1, textTransform: "lowercase" }}
          value={{
            gender: gender,
            value: namaPengunjung,
          }}
          onChange={(_event, value) => {
            if (namaPengunjung != value?.value) {
              // @ts-ignore
              setGender(value?.firstLetter);
              setFieldValue("namaPengunjung", value?.value);
              setFieldValue("genderPengunjung", value?.gender);
            }
          }}
          renderInput={(params) => (
            <TextField
              placeholder="Nama Lengkap Mentor"
              {...params}
              error={Boolean(errors.namaPengunjung)}
            />
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              {option.value.toLocaleLowerCase()}
            </Box>
          )}
          loading={fetchingSiswa}
        />
        <FormHelperText sx={{ color: "#E2403D" }}>
          {errors.namaPengunjung}
        </FormHelperText>
      </FormControl>
    </>
  );
}
