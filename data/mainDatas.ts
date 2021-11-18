export interface SlotDataI {
  lengkap: string;
  panggilan: string;
  level: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  gender: "m" | "f";
  reserved: boolean;
  registered: boolean;
  pendamping?: string;
  statusPendamping?: "keluarga" | "saudara" | "lainnya";
  noWaPendamping?: number;
}

const slotDatas: Array<SlotDataI> = [
  {
    lengkap: "Aldhaneka Aufa Izzat",
    panggilan: "Aldhan",
    level: 8,
    gender: "m",
    reserved: false,
    registered: false,
  },
  {
    lengkap: "Bullitt Zul-",
    panggilan: "Bullitt",
    level: 8,
    gender: "m",
    reserved: false,
    registered: false,
  },
  {
    lengkap: "Sasa",
    panggilan: "sasa",
    level: 8,
    gender: "f",
    reserved: false,
    registered: false,
  },
  {
    lengkap: "Jilan",
    panggilan: "jilan",
    level: 8,
    gender: "f",
    reserved: false,
    registered: false,
  },
  {
    lengkap: "Radit",
    panggilan: "radit",
    level: 7,
    gender: "m",
    reserved: false,
    registered: false,
  },
];

export default slotDatas;
