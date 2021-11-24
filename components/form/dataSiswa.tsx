import React from "react";
import {
  Typography,
  TextField,
  FormControl,
  FormHelperText,
  Box,
  Autocomplete,
} from "@mui/material";
import { FormikErrors } from "formik";
import { FormSchemaI } from "./FormSchema";
import grades from "data/grades";
import getSiswa from "utils/getName";
import { ReservationI } from "model/reservation";

export default function DataSiswa({
  errors,
  setFieldValue,
  namaLengkapSiswa,
  id,
  levelSiswa,
}: {
  errors: FormikErrors<FormSchemaI>;
  getFieldProps: (input: string) => any;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<FormikErrors<FormSchemaI>> | Promise<void>;
  namaLengkapSiswa: string;
  levelSiswa: number;
  id: string;
}) {
  const [daftarSiswa, setDaftarSiswa] = React.useState<Array<ReservationI>>([]);
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

    setDaftarSiswa(siswa.item);
    setFetchingSiswa(false);
  }

  return (
    <>
      <FormControl
        fullWidth
        sx={{ mt: 3, fontFamily: "outfitFont", fontWeight: 500 }}
      >
        <Typography
          style={{
            color: errors.statusPendamping ? "#E2403D" : "#696F79",
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
          {errors.statusPendamping}
        </FormHelperText>
      </FormControl>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <Typography
          style={{
            color: errors.namaLengkapSiswa ? "#E2403D" : "#696F79",
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
            }
          }}
          // @ts-ignore                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   n
          getOptionDisabled={(option) =>
            daftarSiswa.find((siswa) => siswa.id == option.id)?.reservation
              .reserved
          }
          renderInput={(params) => (
            <TextField
              placeholder="Nama Lengkap Siswa"
              {...params}
              error={Boolean(errors.namaLengkapSiswa)}
              sx={{ textTransform: "lowercase" }}
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
