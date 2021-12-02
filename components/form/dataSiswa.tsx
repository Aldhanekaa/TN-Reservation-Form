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
import getSiswa from "utils/getName";
import { ReservationI } from "model/reservation";

export default function DataSiswa({
  errors,
  setFieldValue,
  namaPengunjung,
  id,
  levelSiswa,
  orangTua,
  namaLengkapSiswa,
}: {
  errors: FormikErrors<FormSchemaI>;
  getFieldProps: (input: string) => any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<FormSchemaI>> | Promise<void>;
  namaPengunjung: string;
  namaLengkapSiswa: string;

  levelSiswa: number;
  id: string;
  orangTua: boolean;
}) {
  const [daftarSiswa, setDaftarSiswa] = React.useState<
    Array<{
      nama_lengkap: string;
      level: number;
      gender: "L" | "P";
      id: string;
    }>
  >([]);
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

  console.log(daftarSiswa);
  const daftarSiswaOptions = daftarSiswa.map((option) => {
    return {
      gender: option.gender == "L" ? "Laki" : "Perempuan",
      value: option.nama_lengkap,
      id: option.id,
    };
  });

  React.useEffect(() => {
    gradeChange();
  }, [levelSiswa]);

  async function gradeChange() {
    setFetchingSiswa(true);
    const siswa = await getSiswa(levelSiswa);

    setDaftarSiswa(siswa.items);
    setFetchingSiswa(false);
  }

  return (
    <>
      <Divider sx={{ mt: 2 }} />

      <FormControl
        fullWidth
        sx={{ mt: 3, fontFamily: "outfitFont", fontWeight: 500 }}
      >
        <Typography
          style={{
            color: errors.levelSiswa ? "#E2403D" : "#ECEBEE",
            fontSize: "16px",
            fontFamily: "outfitFont",
            fontWeight: 500,
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
            firstLetter: String(levelSiswa),
            value: levelSiswa,
          }}
          onChange={(_event, value) => {
            if (levelSiswa != value?.value) {
              setFieldValue("genderSiswa", "");

              setFieldValue("namaLengkapSiswa", "");
              setFieldValue("id", "");
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
          {errors.levelSiswa}
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <Typography
          style={{
            color: errors.namaLengkapSiswa ? "#E2403D" : "#ECEBEE",
            fontSize: "16px",
            fontFamily: "outfitFont",
            fontWeight: 500,
          }}
        >
          Nama Lengkap Siswa*
        </Typography>
        <Autocomplete
          fullWidth
          id="namaLengkapSiswa"
          options={daftarSiswaOptions.sort(
            (a, b) => -b.gender.localeCompare(a.gender)
          )}
          groupBy={(option) => option.gender}
          // @ts-ignore
          getOptionLabel={(option) => option.value}
          sx={{ mt: 1, textTransform: "lowercase" }}
          value={{
            gender: gender,
            value: namaLengkapSiswa,
            id: id,
          }}
          onChange={(_event, value) => {
            if (namaLengkapSiswa != value?.value) {
              // @ts-ignore
              setGender(value?.firstLetter);
              setFieldValue("id", value?.id);
              setFieldValue("namaLengkapSiswa", value?.value);
              setFieldValue("genderSiswa", value?.gender);
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
              {option.value.toLocaleLowerCase()}
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
