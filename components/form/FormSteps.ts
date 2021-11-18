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
    label: "Informasi Pendamping",
    label_desc: "Data ini memudahkan kami untuk mengenali pendamping.",
    step: 0,
    inputs: [
      { label: "Nama Pendamping*", input_name: "namaPendamping", show: true },
      { label: "Nomor WA Pendamping*", input_name: "nomorWa", show: false },
      {
        label: "Status Pendamping*",
        input_name: "statusPendamping",
        show: false,
      },
    ],
  },
  {
    label: "Informasi Siswa",
    label_desc: "Data ini digunakan untuk mendata siswa yang ikut.",
    step: 1,
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
