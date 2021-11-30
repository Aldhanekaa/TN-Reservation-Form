import * as Yup from "yup";

const RegisterSchema = Yup.object().shape({
  levelSiswa: Yup.number().min(1, "min 1!").max(9, "max 9!"),
  namaLengkapSiswa: Yup.string().required("Input ini diperlukan!"),
  statusVisitor: Yup.string().required("Input ini diperlukan!"),

  id: Yup.string().required("Input ini diperlukan!"),
});

export interface FormSchemaI {
  statusVisitor: string;
  levelSiswa: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  namaLengkapSiswa: string;
  id: string;
}

export default RegisterSchema;
