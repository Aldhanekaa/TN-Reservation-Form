import axios from "axios";
import { ReservationI } from "model/reservation";

export default async function idk(
  level: number
): Promise<{ item: Array<ReservationI> }> {
  const server = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER}/level/${level}`
  );
  return server.data;
}
