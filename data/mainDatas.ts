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
