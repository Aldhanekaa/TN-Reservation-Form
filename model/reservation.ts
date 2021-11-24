export interface ReservationI {
  gender: "L" | "P";
  id: string;
  level: string;
  nama_lengkap: string;
  registred: boolean;
  reservation: {
    reserved: boolean;
    nama_pendamping: string;
    status_pendamping: string;
    nowa: string;
    dayReserved: number;
    sessionReserved: number;
  };
}
