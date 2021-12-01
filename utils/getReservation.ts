import axios from "axios";
import { ReservationI } from "model/reservation";

export default async function idk(id: string): Promise<{
  item?: ReservationI;
  message: string;
  status: "error" | "success";
}> {
  const server = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER}/api/student/${id}`
  );
  return server.data;
}
