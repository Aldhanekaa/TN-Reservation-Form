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
    label: "Mengenai Pengunjung",
    label_desc:
      "Data ini digunakan untuk mendata pengunjung yang masuk kedalam web.",
    step: 0,
    inputs: [
      {
        label: "Status Visitor*",
        input_name: "statusVisitor",
        show: false,
      },
    ],
  },
  {
    label: "Informasi Pengunjung",
    label_desc:
      "Data ini digunakan untuk mengetahui lebih lanjut informasi pengunjung.",
    step: 1,
    inputs: [
      {
        label: "Gender Pengunjung",
        input_name: "genderSiswa",
        show: false,
      },
      {
        label: "Nama Pengunjung*",
        input_name: "namaPengunjung",
        show: false,
      },
      { label: "Level Siswa*", input_name: "levelSiswa", show: false },
      {
        label: "Nama Lengkap Siswa*",
        input_name: "namaLengkapSiswa",
        show: false,
      },
      {
        label: "Status Visitor*",
        input_name: "statusVisitor",
        show: false,
      },
      {
        label: "Gender Student",
        input_name: "genderSiswa",
        show: false,
      },
    ],
  },
];

export default FormSteps;
