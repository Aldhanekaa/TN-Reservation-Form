import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  namaPendamping: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Nama Pendamping diperlukan!"),

  nomorWa: Yup.string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "Nomor Telepon Invalid!"
    )

    .required("Nomor WA diperlukan!"),

  statusPendamping: Yup.string()
    .min(1, "Too Short!")
    .required("username required"),
  levelSiswa: Yup.number().min(1, "min 1!").max(9, "max 9!"),
  namaLengkapSiswa: Yup.string().required("Input ini diperlukan!"),
});

export interface FormSchemaI {
  namaPendamping: string;
  nomorWa: string;
  statusPendamping: string;
  levelSiswa: number;
  namaLengkapSiswa: string;
}

export default RegisterSchema;
