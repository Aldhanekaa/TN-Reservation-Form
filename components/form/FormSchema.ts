import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  levelSiswa: Yup.number()
    .min(1, "min 1!")
    .max(9, "max 9!")
    .when("statusVisitor", {
      is: ["Siswa", "Orang Tua"],
      then: Yup.number()
        .min(1, "min 1!")
        .max(9, "max 9!")
        .required("Level siswa dibutuhkan!"),
    }),
  namaPengunjung: Yup.string().when("statusVisitor", (value) => {
    if (["Orang Tua", "Mentor", "Lainnya", "Saudara"].includes(value)) {
      return Yup.string().required("Input ini diperlukan!");
    }
    return Yup.string();
  }),
  namaLengkapSiswa: Yup.string().when("statusVisitor", (value) => {
    console.log(value);
    if (["Siswa", "Orang Tua"].includes(value)) {
      return Yup.string().required("Input ini diperlukan!");
    }
    return Yup.string();
  }),
  genderSiswa: Yup.string().when("statusVisitor", (value) => {
    if (["Siswa", "Orang Tua"].includes(value)) {
      return Yup.string().required("Input ini diperlukan!");
    }
    return Yup.string();
  }),
  genderPengunjung: Yup.string().when("statusVisitor", (value) => {
    if (!["Siswa"].includes(value)) {
      return Yup.string().required("Input ini diperlukan!");
    }
    return Yup.string();
  }),

  statusVisitor: Yup.string().required("Input ini diperlukan!"),

  id: Yup.string().when("statusVisitor", (value) => {
    if (["Siswa"].includes(value)) {
      return Yup.string().required("Input ini diperlukan!");
    }
    return Yup.string();
  }),
});

export interface FormSchemaI {
  statusVisitor: "Mentor" | "Siswa" | "Orang Tua" | "Lainnya" | "Saudara" | "";
  levelSiswa: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  namaPengunjung: string;
  namaLengkapSiswa: string;
  id: string;

  genderSiswa?: string;
  genderPengunjung?: string;
}

export default RegisterSchema;
