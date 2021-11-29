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
  >(`${process.env.NEXT_PUBLIC_SERVER}/register_reservation`, {
    id: values.id,
  });
  return server.data;
}
