export interface ReservationI {
  statusVisitor: "Mentor" | "Siswa" | "Orang Tua" | "Lainnya" | "Saudara" | "";
  levelSiswa: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  namaPengunjung: string;
  namaLengkapSiswa: string;
  id: string;
}
