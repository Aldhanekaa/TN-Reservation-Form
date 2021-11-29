const FormSteps: Array<{
  label: string;
  // eslint-disable-next-line camelcase
  label_desc: string;
  step: number;
  // eslint-disable-next-line camelcase
  inputs: Array<{
    label: string;
    // eslint-disable-next-line camelcase
    input_name: string;
    InputProps?: Object;
    show: boolean;
    helperText?: string;
  }>;
}> = [
  {
    label: "Informasi Siswa",
    label_desc: "Data ini digunakan untuk mendata siswa yang ikut.",
    step: 0,
    inputs: [
      { label: "Level Siswa*", input_name: "levelSiswa", show: false },
      {
        label: "Nama Lengkap Siswa*",
        input_name: "namaLengkapSiswa",
        show: false,
      },
    ],
  },
];

export default FormSteps;
