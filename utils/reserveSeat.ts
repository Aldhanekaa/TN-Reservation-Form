import axios from "axios";
import { ReservationI } from "model/reservation";
import { FormSchemaI } from "components/form/FormSchema";
import { getSessionByLevel } from "./getSession";

export default async function idk(values: FormSchemaI): Promise<{
  message: string;
  status: "success" | "error";
  imageUrl?: string;
}> {
  const server = await axios.post<
    {},
    {
      data: {
        message: string;
        status: "success" | "error";
      };
    }
  >(`${process.env.NEXT_PUBLIC_SERVER}/reserve_slot`, {
    id: values.id,
    nama_lengkap: values.namaLengkapSiswa,

    status_pendamping: values.statusPendamping,
    nama_pendamping: values.namaPendamping,
    nowa: values.nomorWa,
    dateReserved: Date.now(),

    day:
      // @ts-ignore
      getSessionByLevel(String(values.levelSiswa)).split(".")[0],
    // @ts-ignore
    session: getSessionByLevel(String(values.levelSiswa)).split(".")[1],
  });
  return server.data;
}
